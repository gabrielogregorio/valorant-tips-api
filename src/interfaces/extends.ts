import { Request } from 'express';

export interface RequestMiddleware extends Request {
  data: {
    id: string;
  };
}


export interface RequestMulter extends Request {
  data: {
    file: any;
  };
}
