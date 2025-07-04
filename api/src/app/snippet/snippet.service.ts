import { db } from '@gist-garden/db';
import { createSnippetSchema, CreateSnippetInput, CreateSnippetServiceInput } from '@gist-garden/api-schemas';

export class SnippetService {
  async getAll() {
    return db.snippet.findMany({ include: { createdBy: true, organization: true } });
  }

  async getById(id: string) {
    return db.snippet.findUnique({ where: { id } });
  }

  async create(data: CreateSnippetServiceInput) {
    // TODO: Replace with actual org/user context
    return db.snippet.create({
      data: {
        ...data,
        createdById: 'seed-user-id',
        organizationId: 'seed-org-id',
      },
    });
  }

  async update(id: string, data: Partial<CreateSnippetServiceInput>) {
    return db.snippet.update({ where: { id }, data });
  }

  async delete(id: string) {
    return db.snippet.delete({ where: { id } });
  }
}