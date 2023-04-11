//this is the common config file
import supertest from 'supertest';
import qaEnv from '../config/qa-env';
const request = supertest(qaEnv.baseUrl);

export default request;