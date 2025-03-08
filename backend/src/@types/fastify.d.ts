import { FastifyInstance } from 'fastify';
import fastifyMultipart from '@fastify/multipart';

declare module 'fastify' {
  interface FastifyInstance {
    multipart: typeof fastifyMultipart;
  }
}
