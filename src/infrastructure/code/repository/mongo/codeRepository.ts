import { CodeAggregateRepositoryInterface } from '../../../../domain/code/repository/inteface';
import { CodeEntity } from '../../../../domain/code/enttity';
import { Code } from './Code';

export class CodeRepository implements CodeAggregateRepositoryInterface {
  save = async (code: CodeEntity): Promise<CodeEntity> => {
    const newCode = new Code(code);
    await newCode.save();

    return new CodeEntity({
      available: newCode.available,
      code: newCode.code,
    });
  };

  findByCode = async (code: string): Promise<CodeEntity | null> => {
    const codeFound = await Code.findOne({ code, available: true });

    if (!codeFound) {
      return null;
    }

    return new CodeEntity({ available: codeFound.available, code: codeFound.code });
  };

  updateToAvailable = async (code: string): Promise<CodeEntity | null> => {
    const filter = { code, available: true };
    const updateTo = { $set: { available: false } };
    const options = { new: true };
    const result = await Code.findOneAndUpdate(filter, updateTo, options);
    if (!result) {
      return null;
    }

    return new CodeEntity({ available: result?.available, code: result.code });
  };
}
