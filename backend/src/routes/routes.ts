import { FastifyInstance } from "fastify";
import { authRoutes } from "./authRoutes";
import { userRoutes } from "./userRoutes";

export async function registerRoutes(app: FastifyInstance) {

  await app.register(authRoutes) 
  await app.register(userRoutes)
}
