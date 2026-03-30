import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(), // LOAD .env
    MongooseModule.forRoot(process.env.MONGO_URI!),
    ProductModule,
  ],
})
export class AppModule { }