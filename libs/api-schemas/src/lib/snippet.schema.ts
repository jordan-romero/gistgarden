import { z } from 'zod';

export const createSnippetSchema = z.object({
    title: z.string().min(1),
    code: z.string().min(1),
    language: z.string().min(1),
    tags: z.array(z.string()).optional(),
    published: z.boolean().optional(),
    organizationId: z.string().cuid(),
    createdById: z.string().cuid(),
    visibility: z.enum(['PRIVATE', 'PUBLIC', 'UNLISTED']).optional(),
  });

export type CreateSnippetInput = z.infer<typeof createSnippetSchema>;

export type CreateSnippetServiceInput = Omit<CreateSnippetInput, 'organizationId' | 'createdById'>;