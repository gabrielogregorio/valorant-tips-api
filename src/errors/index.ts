import { ErrorEnum } from '@/errors/types';

export class CustomError {
  name: ErrorEnum;

  statusCode: number;

  constructor(name: ErrorEnum, statusCode: number) {
    this.name = name;
    this.statusCode = statusCode;
  }
}