import { Request, Response } from 'express';
import { createSnippetSchema } from '@gist-garden/api-schemas';
import { SnippetService } from './snippet.service';

export class SnippetController {
  private service = new SnippetService();

  async getAll(req: Request, res: Response) {
    const snippets = await this.service.getAll();
    res.json(snippets);
  }

  async getById(req: Request, res: Response) {
    const snippet = await this.service.getById(req.params.id);
    if (snippet) {
      res.json(snippet);
    } else {
      res.status(404).send('Not found');
    }
  }

  async create(req: Request, res: Response) {
    const parsed = createSnippetSchema.parse(req.body);
    const snippet = await this.service.create(parsed);
    res.status(201).json(snippet);
  }

  async update(req: Request, res: Response) {
    const parsed = createSnippetSchema.partial().parse(req.body);
    const snippet = await this.service.update(req.params.id, parsed);
    res.json(snippet);
  }

  async remove(req: Request, res: Response) {
    await this.service.delete(req.params.id);
    res.status(204).send();
  }
}