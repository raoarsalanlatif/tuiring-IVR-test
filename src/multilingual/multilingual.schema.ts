import { Schema } from 'mongoose';

export interface IMultilingual {
  en: string;
  ar: string;
}
export const MultilingualSchema = new Schema<IMultilingual>({
  en: {
    type: String,
    required: true,
  },
  ar: {
    type: String,
    required: true,
  },
});
