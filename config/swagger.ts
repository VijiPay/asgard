import path from 'node:path'
import url from 'node:url'
import env from '#start/env'

export default {
  path: `${path.dirname(url.fileURLToPath(import.meta.url))}/../`,
  title: env.get('APP_NAME'),
  version: '1.0.0',
  description: 'descr',
  tagIndex: 3,
  info: {
    title: env.get('APP_NAME'),
    version: '1.0.0',
    description: 'info decr',
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  snakeCase: true,
  debug: false,
  ignore: ['/ag/swagger', '/ag/api-docs', '/', '/ag/health'],
  preferredPutPatch: 'PUT',
  common: {
    parameters: {},
    headers: {},
  },
  securitySchemes: {
    ApiKeyAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'X-API-Key',
    },
  },
  authMiddlewares: ['auth', 'auth:api'],
  defaultSecurityScheme: 'BearerAuth',
  persistAuthorization: true,
  showFullPath: false,
}
