import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private favService: FavoritesService) {}
  @Get()
  getAll() {
    return this.favService.getAllFavs();
  }

  @Post('/track/:id')
  addTrack(@Param('id') id: string) {
    return this.favService.addTrack(id);
  }
  @Delete('/track/:id')
  @HttpCode(204)
  deleteTrack(@Param('id') id: string) {
    return this.favService.deleteTrack(id);
  }

  @Post('/album/:id')
  addAlbum(@Param('id') id: string) {
    return this.favService.addAlbum(id);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  deleteAlbum(@Param('id') id: string) {
    return this.favService.deleteAlbum(id);
  }

  @Post('/artist/:id')
  addArtist(@Param('id') id: string) {
    return this.favService.addArtist(id);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  deleteArtist(@Param('id') id: string) {
    return this.favService.deleteArtist(id);
  }
}
