import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { financeiro } from "~/server/api/routers/financeiro";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */

//! para acessar rota veja pela network do devtools
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  financeiro: financeiro
});

// export type definition of API
export type AppRouter = typeof appRouter;
