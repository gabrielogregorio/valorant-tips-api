import mongoose, { Schema } from 'mongoose';
import { ICode } from 'src/interfaces/code';

const codeSchema = new mongoose.Schema<ICode>(
  {
    // @ts-ignore
    _id: { type: Schema.Types.ObjectId, alias: 'id' },
    code: String,
    available: Boolean,
  },
  {
    timestamps: true,
  },
);

export const Code = mongoose.model<ICode>('Code', codeSchema);
