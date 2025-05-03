'use server';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { createLogger } from '@/lib/logger';

const logger = createLogger('Pdf-Parser');

export const pdfParser = async (file: File) => {
  try {
    const pdfLoader = new PDFLoader(file);
    const documents = await pdfLoader.load();

    return documents
      .map(doc => doc.pageContent)
      .join('\n')
      .normalize('NFC');
  } catch (error) {
    logger.error('PdfParser error', { error });
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};
