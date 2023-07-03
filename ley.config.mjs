import { setEnvironmentVariables } from './util/config.mjs';

setEnvironmentVariables();

const options = {
  ssl: Boolean(process.env.POSTGRES_URL),
};

export default options;
