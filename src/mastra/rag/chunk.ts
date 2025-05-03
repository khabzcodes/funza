import { embedMany } from "ai"
import { MDocument } from '@mastra/rag';
import { PgVector } from '@mastra/pg';
import * as fs from 'fs';
import * as path from 'path';
import { openai } from "@ai-sdk/openai";

const chunk = async () => {
  const pgVector = new PgVector(process.env.POSTGRES_CONNECTION_STRING!);
  // try {
  //   await pgVector.deleteIndex("embeddings");
  //   return;
  // } catch {
  //   return;
  // }
  try {
    await pgVector.getIndexInfo("embeddings")
  } catch {
    await pgVector.createIndex({ indexName: "embeddings", dimension: 1536, metric: "cosine" })
  }

  const documentsDir = path.join(__dirname, '../students/documents');
  const files = fs.readdirSync(documentsDir);

  const markdownFiles = files.filter(file => file.endsWith('.md'));

  markdownFiles.forEach(async file => {
    const filePath = path.join(documentsDir, file);
    console.log('Loading file:', filePath);
    const content = fs.readFileSync(filePath, 'utf8');
    const doc = MDocument.fromText(content);
    const chunks = await doc.chunk({
      strategy: "recursive",
      size: 512,
      overlap: 50,
    });

    const { embeddings } = await embedMany({
      values: chunks.map(chunk => chunk.text),
      model: openai.embedding("text-embedding-3-small"),
    });

    await pgVector.upsert({
      indexName: "embeddings",
      vectors: embeddings,
    });
    console.log(`File ${file} loaded and embedded successfully.`);
  });
}

chunk()