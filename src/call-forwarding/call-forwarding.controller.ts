import { Controller, Get, Post, Body, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/app/filters/http-exception.filter';
import getMessages from 'src/app/api-messages';
import { QueryParamsDTO } from 'src/app/dtos/query-params.dto';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CallForwardingService } from './call-forwarding.service';
import { ParamsHandler } from 'src/app/custom-decorators/params-handler.decorator';
import { IPaginationQuery } from 'src/app/interfaces';
import { GetDigit } from 'src/app/custom-decorators/params-handler.decorator';
const twilio = require('twilio');

UseFilters(HttpExceptionFilter);
@Controller('call-forwarding')
@ApiTags('call-forwarding')
export class CallForwardingController {
  constructor(private callForwardingService: CallForwardingService) {
    twilio.webhook({ validate: false });
  }

  /**
   * The purpose of this method is to provide paginated or filtered activity logs to user
   * @param pagination could receives $rpp, $page, $filter or $orderBy as an arguments
   * @returns array of objects pertaining arguments provided
   */
  @Get()
  @ApiQuery({ type: QueryParamsDTO })
  async get(@ParamsHandler() pagination: IPaginationQuery) {
    const { $rpp, $page, $filter, $orderBy } = pagination;
    if ($rpp && $page) {
      return await this.callForwardingService.getPaginatedCalls(
        $rpp,
        $page,
        $filter,
        $orderBy,
      );
    }
    return {
      data: await this.callForwardingService.getFilteredCalls(
        $filter,
        $orderBy,
      ),
    };
  }

  /**
   * The purpose of this method is to entertain the calls with the welcome message
   * and then further giving option to either redirect call to a different number i.e +33 1 23 45 67 89 or to record a voicemail
   * @param options receives digit as a dialer option, from as the callers number and call_sid in order to identify the voicemail recording
   * @returns
   */
  @Post()
  async insert(
    @GetDigit() options: { digit: string; from: string; call_sid: string },
  ) {
    const createdCall = await this.callForwardingService.entertainCall(options);
    return createdCall;
  }
}
