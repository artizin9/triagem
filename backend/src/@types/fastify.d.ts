import 'fastify';
import { MultipartFile } from '@fastify/multipart';

declare module 'fastify' {
  interface FastifyRequest {
    file?: MultipartFile; // Agora representa corretamente um único arquivo
    files?: MultipartFile[]; // Para múltiplos arquivos
    isMultipart: () => boolean;
  }a
}
