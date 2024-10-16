import { PostEntity } from '../../../../domain/post/entity/post';
import { PostRepository } from '../../../../infrastructure/post/repository/mongo/postRepository';
import { CreatePostUseCase } from './create';

const post = new PostEntity({ id: '123', userId: '456', description: 'new description', title: 'new title' });

const mockRepository = (): PostRepository => ({
  update: jest.fn(),
  save: jest.fn().mockReturnValue(Promise.resolve()),
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

describe('CreatePostUseCase', () => {
  it('should create a post', async () => {
    const postRepository = mockRepository();
    const useCase = new CreatePostUseCase(postRepository);

    const result = await useCase.execute({
      description: post.description,
      title: post.title,
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
      userId: post.userId,
    });
    expect(postRepository.save).toHaveBeenCalledTimes(1);

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
