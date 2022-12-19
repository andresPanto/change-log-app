import { ENTITIES } from './entities';

export const CONSTANTS = {
  DB: {
    host: 'localhost',
    port: 49154,
    username: 'root',
    password: 'root',
    database: 'postgres',
    entities: [...ENTITIES],
    autoLoadEntitites: true,
    synchronize: true,
    dropSchema: false,
  },
};
