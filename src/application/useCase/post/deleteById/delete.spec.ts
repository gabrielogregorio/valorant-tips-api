import { PostEntity } from '../../../../domain/post/entity/post';
import { PostAggregateRepositoryInterface } from '../../../../domain/post/repository/postRepository.interface';
import { DeletePostUseCase } from './delete';

const post = new PostEntity({ id: '123', userId: '456', description: 'new description', title: 'new title' });

const mockRepository = (mockFindById: any): PostAggregateRepositoryInterface => ({
  update: jest.fn(),
  save: jest.fn(),
  findById: jest.fn().mockReturnValue(mockFindById),
  findAvailableMaps: jest.fn(),
  findAvailableAgents: jest.fn(),
  findAll: jest.fn(),
  findAllByMapAndAgent: jest.fn(),
  deleteById: jest.fn(),
  countAll: jest.fn(),
  findMaps: jest.fn(),
  findAgents: jest.fn(),
});

describe('DeletePostUseCase', () => {
  it('should delete a post', async () => {
    const postRepository = mockRepository(post);
    const useCase = new DeletePostUseCase(postRepository);

    const result = await useCase.execute('123', post.userId);
    expect(postRepository.deleteById).toHaveBeenCalledTimes(1);

    expect(result).toEqual(undefined);
  });
});
