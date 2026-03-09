/* eslint-disable max-params */
import { Request, Response, Express } from 'express';
import { CreatePostUseCaseInterface } from '@/application/contexts/post/useCases/create/CreatePostUseCaseInterface';
import { UpdatePostUseCaseInterface } from '@/application/contexts/post/useCases/update/UpdatePostUseCaseInterface';
import { FindPostByIdOrThrowUseCaseInterface } from '@/application/contexts/post/useCases/findByIdOrThrow/IFindPostByIdOrThrowUseCase';
import { FindAllPostUseCaseInterface } from '@/application/contexts/post/useCases/findAll/FindAllPostUseCaseInterface';
import { FindAllByMapAndAgentUseCaseInterface } from '@/application/contexts/post/useCases/findAllByMapAndAgent/FindAllByMapAndAgentUseCaseInterface';
import { useValidation } from '@/infrastructure/api/middlewares/useValidation';
import { DeletePostUseCaseInterface } from '@/application/contexts/post/useCases/deleteById/DeletePostUseCaseInterface';
import { StorageServiceInterface } from '@/application/services/StorageServiceInterface';
import { HandleUploadFileInterface } from '@/application/services/HandleUploadFileInterface';
import { HttpResponse } from 'src/shared/http/HttpResponse';
import { PostPresenter } from '@/application/contexts/post/presenters/PostPresenter';
import { PostControllerInterface } from './PostControllerInterface';
import { statusCode } from '../config/statusCode';
import { schemaUpdatePosts } from '../routes/updatePost.schema';
import { getImagePath } from '../helpers/getImagePath';

export class PostController implements PostControllerInterface {
  folderPostsSteps: string = 'posts';

  constructor(
    private _createPostUseCase: CreatePostUseCaseInterface,
    private _updatePostUseCase: UpdatePostUseCaseInterface,
    private _findPostByIdOrThrowUseCase: FindPostByIdOrThrowUseCaseInterface,
    private _findAllPostUseCase: FindAllPostUseCaseInterface,
    private _findAllByMapAndAgentUseCase: FindAllByMapAndAgentUseCaseInterface,
    private _deletePostUseCase: DeletePostUseCaseInterface,
    private _handleUploadFile: HandleUploadFileInterface,
    private _storageService: StorageServiceInterface,
  ) {}

  createPost = async (req: Request, res: Response): Promise<Response> => {
    const { title, description } = req.body;

    const agentIds = JSON.parse(req.body.agentIds || '[]');
    const mapIds = JSON.parse(req.body.mapIds || '[]');
    const steps = JSON.parse(req.body.steps || '[]');
    const userId = req.data.userId as string;
    const files = req.files as Express.Multer.File[];

    // Mapear arquivos por fieldname
    const fileMap = new Map<string, Express.Multer.File>();

    files?.forEach((file) => {
      fileMap.set(file.fieldname, file);
    });

    // Processar steps
    const processedSteps = await Promise.all<{ description: string; imageUrl: string }>(
      steps.map(async (step: any) => {
        let imageUrl: string | undefined;

        const file = fileMap.get(step.imageField);

        if (file) {
          const processed = await this._handleUploadFile.process({
            buffer: file.buffer,
          });

          imageUrl = await this._storageService.upload(this.folderPostsSteps, processed.data);
        }

        return {
          description: step.description,
          imageUrl: imageUrl ? getImagePath(imageUrl) : undefined,
        };
      }),
    );

    const post = await this._createPostUseCase.execute({
      title,
      description,
      authorIds: [userId],
      tagIds: [],
      agentIds,
      mapIds,
      steps: processedSteps,
    });

    return HttpResponse.ok(res, PostPresenter.toViewModel(post));
  };

  updatePost = async (req: Request, res: Response): Promise<Response> => {
    const content = useValidation(req, schemaUpdatePosts);

    const { title, description, agentIds, mapIds, steps, tagIds } = content.body;
    const { id } = content.params;
    const userId = req.data.userId as string;

    const post = await this._updatePostUseCase.execute(id, {
      agentIds,
      authorIds: [userId],
      mapIds,
      steps,
      title,
      tagIds,
      description,
    });

    return res.json(post);
  };

  get = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const post = await this._findPostByIdOrThrowUseCase.execute(id);

    return HttpResponse.ok(res, PostPresenter.toViewModel(post));
  };

  getPosts = async (req: Request, res: Response) => {
    const { agent, map } = req.query as { agent: string; map: string };
    console.log(agent, map);
    const posts = await this._findAllPostUseCase.execute({ agent, map });

    return HttpResponse.ok(res, PostPresenter.toViewModelList(posts));
  };

  getPostsByMapAndAgent = async (req: Request, res: Response) => {
    const { agent, map } = req.params as { agent: string; map: string };

    const posts = await this._findAllByMapAndAgentUseCase.execute({ agent, map });

    return res.status(statusCode.SUCCESS.code).json({
      posts,
    });
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    const idPost = req.params.id;
    const userId = req.data.userId as string;

    await this._deletePostUseCase.execute(idPost, userId);

    return HttpResponse.noContent(res);
  };
}
