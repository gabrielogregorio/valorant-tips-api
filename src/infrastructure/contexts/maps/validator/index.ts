import { ValidatorInterface } from '@/domain/contexts/common/validators';
import { MapsEntity } from '@/domain/contexts/contexts/maps/entity';
import { ValidationError } from '@/infrastructure/contexts/validationError';
import { mapSchema } from './schema';

export class MapsZodValidator implements ValidatorInterface<MapsEntity> {
  private _schema = mapSchema;

  public validate(entity: MapsEntity): void {
    const result = this._schema.safeParse({
      id: entity.id.getValue(),
      name: entity.name,
      imageUrl: entity.imageUrl,
    });

    if (!result?.error) {
      return;
    }

    throw new ValidationError(
      result.error.errors.map((item) => ({
        location: item.path[0].toString(),
        message: item.message,
        path: item.path.reduce((prev, current) => (prev ? `${prev}.${current}` : String(current)), '').toString(),
        type: item.code,
      })),
    );
  }
}
