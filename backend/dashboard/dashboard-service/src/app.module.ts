import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UniswapModule } from './uniswap/uniswap.module';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env' }), UniswapModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
