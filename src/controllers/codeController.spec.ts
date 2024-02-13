import { SECURITY_CODE } from '@/config/envs';
import { CodeController } from '@/controllers/codeController';
import { AppError } from '@/errors/index';
import { errorStates } from '@/errors/types';
import { Response } from 'express';

const mockCodeService = { create: jest.fn() };
const codeController = new CodeController(mockCodeService as any);

describe('Code Controller', () => {
  let mockResponse: Partial<Response>;
  let mockSend: jest.Mock;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

  beforeEach(() => {
    mockSend = jest.fn();
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({ json: jest.fn(), send: mockSend });
    mockResponse = {
      json: mockJson,
      status: mockStatus,
    };
  });

  describe('generate', () => {
    it('should throw an error if security code is invalid', async () => {
      const mockRequest = {
        body: { securityCode: 'wrong_code' },
      } as unknown as any;

      await expect(codeController.generate(mockRequest, mockResponse as Response)).rejects.toEqual(
        new AppError(errorStates.TOKEN_IS_INVALID_OR_EXPIRED, 'Token is different from security code'),
      );
    });

    it('should generate a token if the security code is valid', async () => {
      const mockRequest = {
        body: { securityCode: SECURITY_CODE },
      };
      const fakeToken = { code: '12345' };
      mockCodeService.create.mockResolvedValue(fakeToken);

      await codeController.generate(mockRequest as any, mockResponse as Response);

      expect(mockCodeService.create).toHaveBeenCalled();
      expect(mockJson).toHaveBeenCalledWith({ token: fakeToken.code });
    });
  });
});
