/* eslint-disable id-length */
import { Response } from 'express';

export interface HttpEnvelopeInterface<T> {
  data: T;
  meta?: {
    page?: number;
    total?: number;
    timestamp: string;
  };
}

export interface HttpErrorEnvelopeInterface {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export class HttpResponse {
  static ok<T>(res: Response, data: T, meta?: HttpEnvelopeInterface<T>['meta']): Response {
    const envelope: HttpEnvelopeInterface<T> = {
      data,
      meta: {
        timestamp: new Date().toISOString(),
        ...meta,
      },
    };
    return res.status(200).json(envelope);
  }

  static created<T>(res: Response, data: T): Response {
    return res.status(201).json({ data, meta: { timestamp: new Date().toISOString() } });
  }

  static noContent(res: Response): Response {
    return res.status(204).send(); // sem conetudo
  }

  static badRequest(res: Response, message: string, code = 'BAD_REQUEST'): Response {
    return res.status(400).json({ error: { code, message } });
  }

  static notFound(res: Response, message = 'Resource not found'): Response {
    return res.status(404).json({ error: { code: 'NOT_FOUND', message } });
  }

  static internalError(res: Response): Response {
    return res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } });
  }
}
