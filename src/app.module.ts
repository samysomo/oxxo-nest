import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmployeesModule } from './employees/employees.module';
import { ProductsModule } from './products/products.module';
import { ProvidersModule } from './providers/providers.module';
import { ManagersModule } from './managers/managers.module';
import { LocationsModule } from './locations/locations.module';
import { RegionsModule } from './regions/regions.module';
import { AuthModule } from './auth/auth.module';
import { AwsModule } from './aws/aws.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env"
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log({
          host: configService.get<string>('host'),
          port: parseInt(configService.get<string>('port'), 10),
          username: configService.get<string>('username'),
          pass: configService.get<string>('pass'),
          name: configService.get<string>('name'),
        });
        return {
        type: 'postgres',
        host: configService.get<string>('host'),
        port: parseInt(configService.get<string>('port'), 10),
        username: "postgres",
        password: configService.get<string>('pass'),
        database: configService.get<string>('name'),
        entities: [],
        autoLoadEntities: true,
        synchronize: true, // Desactiva en producción
      }},
    }),
    EmployeesModule,
    ProductsModule,
    ProvidersModule,
    ManagersModule,
    LocationsModule,
    RegionsModule,
    AuthModule,
    AwsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
