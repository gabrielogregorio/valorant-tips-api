/* eslint-disable max-params */
import { Request, Response } from 'express';
import { GetAgentsUseCaseInterface } from '@/application/contexts/agents/useCases/get/GetAgentsUseCaseInterface';
import { CreateAgentUseCaseInterface } from '@/application/contexts/agents/useCases/add/CreateAgentUseCaseInterface';
import { AgentsControllerInterface } from '@/infrastructure/api/controllers/AgentsControllerInterface';
import { UpdateAgentUseCaseInterface } from '@/application/contexts/agents/useCases/update/UpdateAgentUseCaseInterface';
import { HandleUploadFile } from '@/infrastructure/services/HandleUploadFile';
import { StorageServiceInterface } from '@/application/services/StorageServiceInterface';
import { FindAvailableAgentsByMapsUseCaseInterface } from '@/application/contexts/agents/useCases/findAvailableAgentsByMaps/findAvailableAgentsByMapsUseCase';
import { FindAvailableAgentsUseCaseInterface } from '@/application/contexts/agents/useCases/findAvailableAgents/FindAvailableAgentsUseCaseInterface';
import { getImagePath } from '../helpers/getImagePath';

export class AgentsController implements AgentsControllerInterface {
  folderAgentsMaps: string = 'agents';

  constructor(
    private _createAgentsUseCase: CreateAgentUseCaseInterface,
    private _updateAgentsUseCase: UpdateAgentUseCaseInterface,
    private _getAgentsUseCase: GetAgentsUseCaseInterface,
    private _handleUploadFile: HandleUploadFile,
    private _storageService: StorageServiceInterface,
    private _findAvailableAgentsUseCase: FindAvailableAgentsUseCaseInterface,
    private _findAvailableAgentsByMapsUseCase: FindAvailableAgentsByMapsUseCaseInterface,
  ) {}

  update = async (req: Request, res: Response): Promise<Response> => {
    const { name } = req.body;

    let imageUrl: string | undefined;

    if (req.file) {
      const processed = await this._handleUploadFile.process({ buffer: req.file.buffer });
      imageUrl = await this._storageService.upload(this.folderAgentsMaps, processed.data);
    }

    const map = await this._updateAgentsUseCase.execute({
      id: req.params.id,
      name,
      imageUrl: imageUrl ? getImagePath(imageUrl) : undefined  // pode ser undefined
    });

    return res.json(map);
  };

  getAgents = async (req: Request, res: Response<{ agents: string[] }>) => {
    const agents = await this._findAvailableAgentsUseCase.execute(req.params.map);

    return res.json({ agents });
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const processed = await this._handleUploadFile.process({ buffer: req.file.buffer });
    const imageUrl = await this._storageService.upload(this.folderAgentsMaps, processed.data);

    const agent = await this._createAgentsUseCase.execute(req.body.name, imageUrl);

    return res.json({
      id: agent.id,
      name: agent.name,
      imageUrl: getImagePath(agent.imageUrl),
    });
  };

  findAvailableAgentsByMaps = async (req: Request, res: Response): Promise<Response> => {
    const agents = await this._findAvailableAgentsByMapsUseCase.execute(req.params.mapId);

    return res.json(
      agents.map((agent) => ({
        id: agent.id,
        name: agent.name,
        imageUrl: getImagePath(agent.imageUrl),
      })),
    );
  };

  getAll = async (_req: Request, res: Response): Promise<Response> => {
    const agents = await this._getAgentsUseCase.execute();

    return res.json(
      agents.map((map) => ({
        id: map.id,
        name: map.name,
        imageUrl: getImagePath(map.imageUrl),
      })),
    );
  };
}
