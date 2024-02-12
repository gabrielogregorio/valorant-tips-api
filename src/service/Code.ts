import { v4 as uuidV4 } from 'uuid';
import { Code, ICode } from '@/models/Code';

export class CodeService {
   async Create(): Promise<ICode> {
    const newCode = new Code({
      code: `${uuidV4()}${Math.random()}${uuidV4()}${Math.random()}`,
      available: true,
    });
    await newCode.save();
    return newCode;
  }

   async FindCode(code: string): Promise<ICode> {
    return Code.findOne({ code, available: true });
  }

   async UseCode(code: string): Promise<ICode> {
    return Code.findOneAndUpdate({ code, available: true }, { $set: { available: false } }, { new: true });
  }
}
