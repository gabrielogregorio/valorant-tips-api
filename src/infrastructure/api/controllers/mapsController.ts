/* eslint-disable max-params */
import { Request, Response } from 'express';
import { MapsControllerInterface } from '@/infrastructure/api/controllers/MapsControllerInterface';
import { GetMapsUseCaseInterface } from '@/application/contexts/maps/useCases/get/GetMapsUseCaseInterface';
import { UpdateMapUseCaseInterface } from '@/application/contexts/maps/useCases/update/UpdateMapUseCaseInterface copy';
import { CreateMapUseCaseInterface } from '@/application/contexts/maps/useCases/add/CreateMapUseCaseInterface';
import { StorageServiceInterface } from '@/application/services/StorageServiceInterface';
import { UpdateMapPresenter } from '@/application/contexts/maps/presenters/UpdateMapPresenter';
import { FindAvailableMapsUseCaseInterface } from '@/application/contexts/maps/useCases/findAvailableMaps/FindAvailableMapsUseCaseInterface';
import { HandleUploadFileInterface } from '@/application/services/HandleUploadFileInterface';
import { HttpResponse } from '../../../shared/http/HttpResponse';
import { getImagePath } from '../helpers/getImagePath';

export class MapsController implements MapsControllerInterface {
  folderSaveMaps: string = 'maps';

  constructor(
    private _createMapUseCase: CreateMapUseCaseInterface,
    private _updateMapUseCase: UpdateMapUseCaseInterface,
    private _getMapsUseCase: GetMapsUseCaseInterface,
    private _handleUploadFile: HandleUploadFileInterface,
    private _storageService: StorageServiceInterface,
    private _findAvailableMapsUseCase: FindAvailableMapsUseCaseInterface,
  ) {}

  update = async (req: Request, res: Response): Promise<Response> => {
    const { name } = req.body;

    let imageUrl: string | undefined;

    if (req.file) {
      const processed = await this._handleUploadFile.process({ buffer: req.file.buffer });
      imageUrl = await this._storageService.upload(this.folderSaveMaps, processed.data);
    }

    const map = await this._updateMapUseCase.execute({
      id: req.params.id,
      name,
      imageUrl, // pode ser undefined
    });

    return HttpResponse.ok(res, UpdateMapPresenter.toViewModel(map));
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const processed = await this._handleUploadFile.process({ buffer: req.file.buffer });
    const imageUrl = await this._storageService.upload(this.folderSaveMaps, processed.data);

    const map = await this._createMapUseCase.execute(req.body.name, imageUrl);

    return HttpResponse.ok(res, UpdateMapPresenter.toViewModel(map));
  };

  getAll = async (req: Request, res: Response): Promise<Response> => {
    const withPosts = req.query.filter === 'with-posts';

    const maps = withPosts ? await this._findAvailableMapsUseCase.execute() : await this._getMapsUseCase.execute();

    return res.json(
      maps.map((map) => ({
        id: map.id,
        name: map.name,
        imageUrl: getImagePath(map.imageUrl),
      })),
    );
  };
}
