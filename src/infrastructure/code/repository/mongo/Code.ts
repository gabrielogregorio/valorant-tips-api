import mongoose from 'mongoose';
import { ICode } from 'src/interfaces/code';

const codeSchema = new mongoose.Schema<ICode>(
  {
    code: String,
    available: Boolean,
  },
  {
    timestamps: true,
    id: true,
  },
);

codeSchema.virtual('id').get(function () {
  return this._id;
});

export const Code = mongoose.model<ICode>('Code', codeSchema);
