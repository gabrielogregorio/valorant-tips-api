import { PostEntity } from '@/domain/contexts/contexts/post/entity/post';
import { PostRepositoryInterface } from '@/domain/contexts/contexts/post/repository';
import { UserRepositoryInterface } from '@/domain/contexts/contexts/user/repository';
import { UpdatePostUseCase } from '.';
import { AgentsRepositoryInterface } from '@/domain/contexts/contexts/agents/repository';
import { MapsRepositoryInterface } from '@/domain/contexts/contexts/maps/repository';
import { PostTagsRepositoryInterface } from '@/domain/contexts/contexts/postTags/repository';

const post = PostEntity.restore({
  id: '123',
  description: 'new description',
  title: 'new title',
  authors: [],
  agents: [],
  maps: [],
  tags: [],
  steps: [],
  createdAt: new Date(),
  updateAt: new Date(),
  isDeleted: false,
  isPublished: false,
});

const mockRepository = (): PostRepositoryInterface => ({
  update: jest.fn().mockImplementation((p) => Promise.resolve(p)),
  save: jest.fn(),
  findById: jest.fn().mockReturnValue(Promise.resolve(post)),
  findAll: jest.fn(),
  findAllByMapAndAgent: jest.fn(),
  countAll: jest.fn(),
  findMapsInPosts: jest.fn(),
  findAgentsByMapInPosts: jest.fn(),
  findMaps: jest.fn(),
  findAgents: jest.fn(),
});

const mockUserRepository = (): UserRepositoryInterface => ({
  save: jest.fn(),
  update: jest.fn(),
  findById: jest.fn(),
  findByIds: jest.fn().mockReturnValue(Promise.resolve([])),
  findOneByUsername: jest.fn(),
  findOneAndDelete: jest.fn(),
  countDocuments: jest.fn(),
});

const mockAgentsRepository = (): AgentsRepositoryInterface => ({
  findByIds: jest.fn().mockReturnValue(Promise.resolve([])),
  save: jest.fn(),
  update: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
});

const mockMapsRepository = (): MapsRepositoryInterface => ({
  findByIds: jest.fn().mockReturnValue(Promise.resolve([])),
  save: jest.fn(),
  update: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
});

const mockPostTagsRepository = (): PostTagsRepositoryInterface => ({
  findByIds: jest.fn().mockReturnValue(Promise.resolve([])),
  save: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  countAll: jest.fn(),
});

describe('UpdatePostUseCase', () => {
  it('should update a a post', async () => {
    const postRepository = mockRepository();
    const userRepository = mockUserRepository();
    const agentsRepository = mockAgentsRepository();
    const mapsRepository = mockMapsRepository();
    const postTagsRepository = mockPostTagsRepository();

    const useCase = new UpdatePostUseCase(
      postRepository,
      userRepository,
      mapsRepository,
      agentsRepository,
      postTagsRepository,
    );

    const result = await useCase.execute(post.id.getValue(), {
      description: post.description,
      title: post.title,
      authorIds: [],
      agentIds: [],
      mapIds: [],
      tagIds: [],
      steps: [],
    });

    expect(postRepository.update).toHaveBeenCalledTimes(1);
  });
});
