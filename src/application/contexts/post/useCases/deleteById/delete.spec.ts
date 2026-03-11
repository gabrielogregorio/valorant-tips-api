import { PostEntity } from '@/domain/contexts/contexts/post/entity/post';
import { PostRepositoryInterface } from '@/domain/contexts/contexts/post/repository';
import { DeletePostUseCase } from '.';

const post = PostEntity.restore({
  id: '123',
  description: 'new description',
  title: 'new title',
  authors: [{ id: { getValue: () => '456' } as any, imageUrl: '', username: '' } as any],
  agents: [],
  maps: [],
  tags: [],
  steps: [],
  createdAt: new Date(),
  updateAt: new Date(),
  isDeleted: false,
  isPublished: false,
});

const mockRepository = (mockFindById: any): PostRepositoryInterface => ({
  update: jest.fn(),
  save: jest.fn(),
  findById: jest.fn().mockReturnValue(mockFindById),
  findAll: jest.fn(),
  findAllByMapAndAgent: jest.fn(),
  countAll: jest.fn(),
  findMapsInPosts: jest.fn(),
  findAgentsByMapInPosts: jest.fn(),
  findMaps: jest.fn(),
  findAgents: jest.fn(),
});

describe('DeletePostUseCase', () => {
  it('should delete a post', async () => {
    const postRepository = mockRepository(post);
    const useCase = new DeletePostUseCase(postRepository);

    const result = await useCase.execute('123', post.authors[0].id.getValue());

    expect(result).toEqual(undefined);
  });
});
