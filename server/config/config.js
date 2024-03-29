const Joi = require('joi');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(...['development', 'production', 'test', 'provision'])
    .default('development'),
  PORT: Joi.number()
    .default(4040),
  MONGOOSE_DEBUG: Joi.boolean()
    .when('NODE_ENV', {
      is: Joi.string().equal('development'),
      then: Joi.boolean().default(true),
      otherwise: Joi.boolean().default(false)
    }),
  JWT_SECRET: Joi.string().required()
    .description('JWT Secret required to sign'),
  MONGO_HOST: Joi.string().required()
    .description('Mongo DB host url'),
  MONGO_PORT: Joi.number(),
  TOKEN_EXPIRATION: Joi.string()
  .default('20s'),
  CLIENT_ID: Joi.string().required()
  .description('Client ID required for github'),
  CLIENT_SECRET: Joi.string().required()
  .description('Client Secret required for github')
}).unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongooseDebug: envVars.MONGOOSE_DEBUG,
  jwtSecret: envVars.JWT_SECRET,
  frontend: envVars.MEAN_FRONTEND || 'angular',
  mongo: {
    host: envVars.MONGO_HOST,
    port: envVars.MONGO_PORT,
    db: envVars.MONGO_DB,
    user: envVars.MONGO_USER || undefined,
    password: envVars.MONGO_PASSWORD || undefined,
  },
  tokenExpiration: envVars.TOKEN_EXPIRATION || (5 * 60 * 60 * 1000), // 5 mins
  clientID: envVars.CLIENT_ID,
  clientSectret: envVars.CLIENT_SECRET
};

module.exports = config;
