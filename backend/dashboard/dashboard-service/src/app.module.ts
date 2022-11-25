import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UniswapModule } from './uniswap/uniswap.module';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env' }), UniswapModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
