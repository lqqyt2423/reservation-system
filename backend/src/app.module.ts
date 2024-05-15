import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ReservationsModule } from './reservations/reservations.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => {
        const MONGO_URI =
          process.env.MONGO_URI ||
          'mongodb://localhost:27017/reservation_system';
        return {
          uri: MONGO_URI,
        };
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    ReservationsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../frontend/dist'),
    }),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
