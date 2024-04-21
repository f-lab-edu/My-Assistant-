import http from 'http';
import {
  Application,
  NextFunction,
  Request,
  Response,
  json,
  urlencoded,
} from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import cors from 'cors';
import compression from 'compression';
import { config } from '@/config';
import { CustomError, IErrorResponse } from '@/middleware/error-handler';
import { Logger } from 'winston';
import { winstonLogger } from '@/utils/logger';
import { appRoutes } from '@/routes';

const SERVER_PORT = 5000;
const log: Logger = winstonLogger('Server', 'debug');

export const start = (app: Application) => {
  securityMiddleware(app);
  standardMiddleware(app);
  routesMiddleware(app);
  errorMiddleware(app);
  startServer(app);
};

const securityMiddleware = (app: Application) => {
  app.set('trust proxy', 1);
  app.use(hpp());
  app.use(helmet());
  app.use(
    cors({
      origin: config.CLIENT_URL,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    }),
  );
};

const standardMiddleware = (app: Application) => {
  app.use(compression());
  app.use(json({ limit: '200mb' }));
  app.use(urlencoded({ extended: true, limit: '200mb' }));
};

function routesMiddleware(app: Application): void {
  appRoutes(app);
}

const errorMiddleware = (app: Application) => {
  app.use(
    (
      error: IErrorResponse,
      _req: Request,
      res: Response,
      next: NextFunction,
    ) => {
      log.log('error', `Server ${error.comingFrom}:`, error);
      if (error instanceof CustomError) {
        res.status(error.statusCode).json(error.serializeErrors());
      }
      next();
    },
  );
};

const startServer = (app: Application) => {
  try {
    const httpServer: http.Server = new http.Server(app);
    log.info(`Server has started with process id ${process.pid}`);
    httpServer.listen(SERVER_PORT, () => {
      log.info(`Server running on port ${SERVER_PORT}`);
    });
  } catch (error) {
    log.log('error', 'startServer() method error:', error);
  }
};
