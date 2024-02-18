/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import express from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    data: {
      id: string;
      file: any;
    };
  }
}
