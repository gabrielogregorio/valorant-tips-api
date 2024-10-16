import { Request, Response } from 'express';
import { errorStates } from '@/errors/types';
import statusCode from '@/config/statusCode';
import { CreateSuggestionUseCase } from '../../../application/useCase/suggestions/create';
import { FindAllSuggestionsUseCase } from '../../../application/useCase/suggestions/findAll/findAll';
import { UpdateSuggestionByIdUseCase } from '../../../application/useCase/suggestions/updateById/updateById';
import { DeleteSuggestionByIdUseCase } from '../../../application/useCase/suggestions/deleteById/suggestion';
import { ApiError } from '../errors/ApiError';
import { ICreateSuggestion, IDatabaseSuggestion, IResponseSuggestion } from '../interfaces/suggestion';

export class SuggestionController {
  constructor(
    private createSuggestionUseCase: CreateSuggestionUseCase,
    private findAllSuggestionsUseCase: FindAllSuggestionsUseCase,
    private updateSuggestionByIdUseCase: UpdateSuggestionByIdUseCase,
    private deleteSuggestionByIdUseCase: DeleteSuggestionByIdUseCase,
  ) {}

  private toHttp(suggestion: IDatabaseSuggestion): IResponseSuggestion {
    return {
      description: suggestion?.description,
      email: suggestion?.email,
      postId: suggestion.postId.toString(),
      id: suggestion?.id?.toString(),
      status: suggestion.status,
      createdAt: suggestion.createdAt,
      updatedAt: suggestion.updatedAt,
    };
  }

  createSuggestion = async (
    req: Request<undefined, undefined, Omit<ICreateSuggestion, 'status'>>,
    res: Response<IResponseSuggestion>,
  ) => {
    const { postId, email, description } = req.body;

    const suggestion = await this.createSuggestionUseCase.execute({
      postId,
      email,
      description,
    });

    return res.json(this.toHttp(suggestion));
  };

  getSuggestions = async (_req: Request, res: Response<IResponseSuggestion[]>): Promise<Response> => {
    const suggestions: IDatabaseSuggestion[] = await this.findAllSuggestionsUseCase.execute();
    const suggestionsFactory: IResponseSuggestion[] = [];
    suggestions.forEach((suggestion) => {
      suggestionsFactory.push(this.toHttp(suggestion));
    });

    return res.json(suggestionsFactory);
  };

  // added middleware in params
  editSuggestion = async (req: Request, res: Response<IResponseSuggestion>): Promise<Response> => {
    const suggestionId = req.params.id;
    const newStatus = req.body.status;

    const suggestionEdited = await this.updateSuggestionByIdUseCase.execute(suggestionId, newStatus);
    return res.json(this.toHttp(suggestionEdited));
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    const suggestionId = req.params.id;

    const result = await this.deleteSuggestionByIdUseCase.execute(suggestionId);
    if (result === null) {
      throw new ApiError(errorStates.RESOURCE_NOT_EXISTS);
    }
    return res.sendStatus(statusCode.NO_CONTENT.code);
  };
}
