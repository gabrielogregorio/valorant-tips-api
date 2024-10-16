import mongoose from 'mongoose';
import { ICode } from 'src/interfaces/code';

const codeSchema = new mongoose.Schema<ICode>(
  {
    id: {
      type: String,
      unique: true,
    },
    code: String,
    available: Boolean,
  },
  {
    timestamps: true,
  },
);


export const Code = mongoose.model<ICode>('Code', codeSchema);
