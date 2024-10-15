import { PostEntity } from '../../../domain/post/entity/post';
import { PostRepository } from '../../../infrastructure/post/repository/mongo/postRepository';
import { UpdatePostUseCase } from './post';

const post = new PostEntity({ id: '123', userId: '456', description: 'new description', title: 'new title' });

const mockRepository = (): PostRepository => ({
  update: jest.fn().mockReturnValue(Promise.resolve(post)),
  create: jest.fn(),
  findById: jest.fn(),
  findAvailableMaps: jest.fn(),
  findAvailableAgents: jest.fn(),
  findAll: jest.fn(),
  findAllByMapAndAgent: jest.fn(),
  deleteById: jest.fn(),
  countAll: jest.fn(),
  findMaps: jest.fn(),
  findAgents: jest.fn(),
});

describe('UpdatePostUseCase', () => {
  it('should update a a post', async () => {
    const postRepository = mockRepository();
    const useCase = new UpdatePostUseCase(postRepository);

    const result = await useCase.execute(post.id, {
      description: post.description,
      title: post.title,
    });
    expect(postRepository.update).toHaveBeenCalledTimes(1);

    expect(result).toEqual({
      description: 'new description',
      imgs: [],
      tags: {
        ability: '',
        agent: '',
        difficult: '',
        map: '',
        mapPosition: '',
        moment: '',
        side: '',
      },
      title: 'new title',
      userId: '456',
    });
  });
});
