import { SnippetService } from '../snippet.service';
import { db } from '@gist-garden/db';

// Mock the database
jest.mock('@gist-garden/db', () => ({
  db: {
    snippet: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

const mockDb = db as jest.Mocked<typeof db>;

describe('SnippetService', () => {
  let service: SnippetService;

  beforeEach(() => {
    service = new SnippetService();
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return all snippets with relations', async () => {
      const mockSnippets = [
        {
          id: '1',
          title: 'Test Snippet 1',
          code: 'console.log("hello")',
          language: 'javascript',
          createdById: 'seed-user-id',
          organizationId: 'seed-org-id',
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: { id: 'seed-user-id', name: 'Test User' },
          organization: { id: 'seed-org-id', name: 'Test Org' },
        },
      ];

      (mockDb.snippet.findMany as jest.Mock).mockResolvedValue(mockSnippets);

      const result = await service.getAll();
      
      expect(result).toEqual(mockSnippets);
      expect(mockDb.snippet.findMany).toHaveBeenCalledWith({
        include: { createdBy: true, organization: true }
      });
    });
  });

  describe('getById', () => {
    it('should return a snippet by id', async () => {
      const mockSnippet = {
        id: '1',
        title: 'Test Snippet',
        code: 'console.log("hello")',
        language: 'javascript',
        createdById: 'seed-user-id',
        organizationId: 'seed-org-id',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (mockDb.snippet.findUnique as jest.Mock).mockResolvedValue(mockSnippet);

      const result = await service.getById('1');
      
      expect(result).toEqual(mockSnippet);
      expect(mockDb.snippet.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
    });

    it('should return null for non-existent snippet', async () => {
      (mockDb.snippet.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await service.getById('999');
      
      expect(result).toBeNull();
      expect(mockDb.snippet.findUnique).toHaveBeenCalledWith({ where: { id: '999' } });
    });
  });

  describe('create', () => {
    it('should create a new snippet', async () => {
      const snippetData = {
        title: 'Test Snippet',
        code: 'console.log("hello")',
        language: 'javascript',
        tags: ['test'],
        published: false,
        visibility: 'PRIVATE' as const,
      };

      const createdSnippet = {
        id: '1',
        ...snippetData,
        createdById: 'seed-user-id',
        organizationId: 'seed-org-id',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (mockDb.snippet.create as jest.Mock).mockResolvedValue(createdSnippet);

      const result = await service.create(snippetData);
      
      expect(result).toEqual(createdSnippet);
      expect(mockDb.snippet.create).toHaveBeenCalledWith({
        data: {
          ...snippetData,
          createdById: 'seed-user-id',
          organizationId: 'seed-org-id',
        },
      });
    });
  });

  describe('update', () => {
    it('should update an existing snippet', async () => {
      const updateData = {
        title: 'Updated Snippet',
        code: 'console.log("updated")',
      };

      const updatedSnippet = {
        id: '1',
        title: 'Updated Snippet',
        code: 'console.log("updated")',
        language: 'javascript',
        createdById: 'seed-user-id',
        organizationId: 'seed-org-id',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (mockDb.snippet.update as jest.Mock).mockResolvedValue(updatedSnippet);

      const result = await service.update('1', updateData);
      
      expect(result).toEqual(updatedSnippet);
      expect(mockDb.snippet.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: updateData,
      });
    });
  });

  describe('delete', () => {
    it('should delete a snippet', async () => {
      const deletedSnippet = {
        id: '1',
        title: 'Deleted Snippet',
        code: 'console.log("deleted")',
        language: 'javascript',
        createdById: 'seed-user-id',
        organizationId: 'seed-org-id',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (mockDb.snippet.delete as jest.Mock).mockResolvedValue(deletedSnippet);

      const result = await service.delete('1');
      
      expect(result).toEqual(deletedSnippet);
      expect(mockDb.snippet.delete).toHaveBeenCalledWith({ where: { id: '1' } });
    });
  });
});