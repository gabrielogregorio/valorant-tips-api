import mongoose from 'mongoose';

export interface ICode {
  code: string;
  available: boolean;
}

const codeSchema = new mongoose.Schema<ICode>(
  {
    code: String,
    available: Boolean,
  },
  {
    timestamps: true,
  },
);

export const Code = mongoose.model<ICode>('Code', codeSchema);
