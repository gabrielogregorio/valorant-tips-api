import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import { Code, ICode } from '@/models/Code';

dotenv.config();

export class CodeService {
  static async Create(): Promise<ICode> {
    const newCode = new Code({
      code: `${uuidv4()}${Math.random()}${uuidv4()}${Math.random()}`,
      available: true,
    });
    await newCode.save();
    return newCode;
  }

  static async FindCode(code: string): Promise<ICode> {
    const codeAccess = await Code.findOne({ code, available: true });
    return codeAccess;
  }

  static async UseCode(code: string): Promise<ICode> {
    const codeAccess = await Code.findOneAndUpdate(
      { code, available: true },
      { $set: { available: false } },
      { new: true },
    );
    return codeAccess;
  }
}
