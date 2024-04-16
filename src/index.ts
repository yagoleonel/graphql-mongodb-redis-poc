import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { resolvers, typeDefs } from './schemas';
import { initDatabase } from './db';
import express from 'express'
import http from 'http'
import cors from 'cors'

const PORT = 4000;

async function startServer() {
  try {
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
      ],
      formatError: (err) => {
        console.error(err);
        throw err;
      }
    });

    await initDatabase();
    await server.start();

    app.use(
      '/',
      cors<cors.CorsRequest>({ origin: '*' }),
      express.json(),
      expressMiddleware(server),
    );

    await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1); // Exit the process with an error code
  }
}

startServer().then(() => {
  console.log(`🚀 Server running at port ${PORT}`);
})



