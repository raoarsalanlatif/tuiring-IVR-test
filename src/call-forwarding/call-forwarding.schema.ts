import { Schema } from 'mongoose';
import { CALL_COLLECTION } from './call-forwarding.constant';

export enum CallStatus {
  CALL = 'Call',
  VOICEMAIL = 'Voicemail',
}

export interface ICall {
  _id: Schema.Types.ObjectId;
  call_status: string;
  duration: number;
  from: string;
  audio_sid?: string;
}

export const CallSchema = new Schema<ICall>(
  {
    call_status: {
      type: String,
      required: true,
      enum: CallStatus,
    },
    audio_sid: {
      type: String,
      required: false,
      default: '',
    },
    duration: {
      type: Number,
      required: true,
    },
    from: {
      type: String,
      required: true,
      default: '',
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    collection: CALL_COLLECTION,
  },
);

CallSchema.pre(['find', 'findOne', 'findOneAndUpdate'], function () {
  this.lean();
});
