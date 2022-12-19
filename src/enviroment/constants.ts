import { ENTITIES } from './entities';

export const CONSTANTS = {
  DB: {
    host: 'localhost',
    port: ,
    username: '',
    password: '',
    database: '',
    entities: [...ENTITIES],
    autoLoadEntitites: true,
    synchronize: true,
    dropSchema: false,
  },
};
