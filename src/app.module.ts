import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { TracksController } from './tracks/tracks.controller';
import { TracksService } from './tracks/tracks.service';
import { TracksModule } from './tracks/tracks.module';
import { ArtistsController } from './artists/artists.controller';
import { ArtistsModule } from './artists/artists.module';
import { ArtistsService } from './artists/artists.service';
import { AlbumsController } from './albums/album.controller';
import { AlbumsModule } from './albums/album.module';
import { AlbumsService } from './albums/album.service';
import { FavoritesModule } from './favorites/favorites.module';
import { FavoritesController } from './favorites/favorites.controller';
import { FavoritesService } from './favorites/favorites.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    UsersModule,
    TracksModule,
    ArtistsModule,
    AlbumsModule,
    FavoritesModule,
  ],
  controllers: [
    AppController,
    UsersController,
    TracksController,
    ArtistsController,
    AlbumsController,
    FavoritesController,
  ],
  providers: [
    AppService,
    UsersService,
    TracksService,
    ArtistsService,
    AlbumsService,
    FavoritesService,
  ],
})
export class AppModule {}
