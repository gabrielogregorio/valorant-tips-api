// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import express from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    data: {
      id: string;
      file: any;
    };
  }
}
