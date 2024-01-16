// src/mongo.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CONNECTION_STRING } from './configuration';

@Module({
  imports: [MongooseModule.forRoot(CONNECTION_STRING)],
})
export class MongoModule {}
