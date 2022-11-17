import { DataSource } from 'typeorm';
import { PairHourDataEntity } from '../uniswap/infrastructure/persistence/entities/pair.hour.data.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        entities: [PairHourDataEntity],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
