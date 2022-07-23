import { Injectable, ConflictException, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { IPageinatedDataTable } from 'src/app/interfaces';
import { CALL_PROVIDER_TOKEN } from './call-forwarding.constant';
import { ICall } from './call-forwarding.schema';

import { CallStatus } from './call-forwarding.schema';

const VoiceResponse = require('twilio').twiml.VoiceResponse;

@Injectable()
export class CallForwardingService {
  constructor(
    @Inject(CALL_PROVIDER_TOKEN)
    private callModel: Model<ICall>,
  ) {}

  async getPaginatedCalls(
    rpp: number,
    page: number,
    filter: Object,
    orderBy: Object,
  ): Promise<IPageinatedDataTable> {
    const skip: number = (page - 1) * rpp;
    const totalDocuments: number = await this.callModel.countDocuments(filter);
    const totalPages: number = Math.ceil(totalDocuments / rpp);
    page = page > totalPages ? totalPages : page;

    const calls = await this.callModel
      .find(filter)
      .sort(orderBy)
      .skip(skip)
      .limit(rpp);

    return {
      pages: `Page ${page} of ${totalPages}`,
      total: totalDocuments,
      data: calls,
    };
  }

  async getFilteredCalls($filter: Object, $orderBy: Object) {
    return await this.callModel.find($filter).sort($orderBy);
  }

  async entertainCall(option: {
    digit: string;
    from: string;
    call_sid: string;
  }) {
    //Organizations Welcome message
    if (option.digit !== '1' && option.digit !== '2') {
      const response = await this.Welcome();
      return response;
    }

    //Forwarding call to another number
    else if (option.digit === '1') {
      const response = await this.Call();
      await new this.callModel({
        call_status: CallStatus.CALL,
        from: option.from,
        duration: response.duration,
      }).save();
      return response.message;
    }

    //recording a voice mail
    else if (option.digit === '2') {
      const response = await this.voiceMail();
      await new this.callModel({
        call_status: CallStatus.VOICEMAIL,
        from: option.from,
        audio_sid: `recordings?agentId=${option.call_sid}`,
        duration: response.duration,
      }).save();
      return response.message;
    }
  }

  async Welcome() {
    const voiceResponse = new VoiceResponse();

    const gather = voiceResponse.gather();

    gather.say(
      'Thanks for calling Tuiring technology Services. ' +
        'Please press 1 for calling an alternative number. ' +
        'Press 2 to record your voice mail.',
      { loop: 3 },
    );

    return voiceResponse.toString();
  }

  async Call() {
    const twiml = new VoiceResponse();
    let duration;
    try {
      const start = new Date().getTime();
      const x = twiml.dial('+33 1 23 45 67 89');
      const end = new Date().getTime();
      duration = end - start;
    } catch (e) {
      console.log('ERROR:', e);
      throw e;
    }

    return { duration: duration, message: twiml.toString() };
  }

  async voiceMail() {
    const twiml = new VoiceResponse();
    let duration;
    try {
      twiml.say(
        { voice: 'alice', language: 'en-GB' },
        'It appears that you want to record a voice mail' +
          'Please leave a message after the beep',
      );
      const start = new Date().getTime();
      twiml.record({
        maxLength: 20,
        action: '/agents/hangup',
        //transcribeCallback: '/recordings?agentId=' + req.query.agentId,
      });
      const end = new Date().getTime();
      duration = end - start;
      twiml.say(
        { voice: 'alice', language: 'en-GB' },
        'Thank You for recording your message. Have a nice day!',
      );
      twiml.hangup();
    } catch (e) {
      console.log('ERROR:', e);
      throw e;
    }

    return { duration: duration, message: twiml.toString() };
  }
}
