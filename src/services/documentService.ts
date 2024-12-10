import { DocumentParser, createDocumentParser } from '../utils/llamaParser';
import { ProcessedFileData } from '../types/fileTypes';

export class DocumentService {
  private parser: DocumentParser;

  constructor() {
    this.parser = createDocumentParser();
  }

  async processDocuments(files: File[]): Promise<ProcessedFileData[]> {
    try {
      const parsedDocs = await this.parser.parseDocuments(files);
      const metadata = await this.parser.extractMetadata(parsedDocs);

      return metadata.map((doc, index) => ({
        name: files[index].name,
        type: files[index].type,
        data: [{
          title: doc.title,
          author: doc.author,
          date: doc.date,
          type: doc.type,
          content: doc.content,
          pageCount: doc.pageCount
        }],
        columns: ['title', 'author', 'date', 'type', 'content', 'pageCount']
      }));
    } catch (error: any) {
      console.error('Document processing failed:', error);
      throw new Error(`Failed to process documents: ${error.message}`);
    }
  }
}

export const createDocumentService = (): DocumentService => {
  return new DocumentService();
};