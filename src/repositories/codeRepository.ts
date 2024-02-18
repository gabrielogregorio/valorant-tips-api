/* eslint-disable import/no-restricted-paths */
import { Code } from '@/models/Code';
import { ICode } from '@/interfaces/code';

export class CodeRepository {
  create = async (code: ICode): Promise<ICode> => {
    const newCode = new Code(code);
    await newCode.save();
    return newCode;
  };

  findByCode = async (code: string): Promise<ICode | null> => Code.findOne({ code, available: true });

  updateToAvailable = async (code: string): Promise<ICode | null> =>
    Code.findOneAndUpdate({ code, available: true }, { $set: { available: false } }, { new: true });
}
