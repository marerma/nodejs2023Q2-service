import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Res,
} from '@nestjs/common';
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
  deleteTrack(@Param('id') id: string, @Res() res) {
    this.favService
      .deleteTrack(id)
      .then(() => res.status(HttpStatus.NO_CONTENT).send())
      .catch((resp) => {
        if (resp instanceof HttpException) {
          res.status(resp.getStatus()).send();
        }
      });
  }

  @Post('/album/:id')
  addAlbum(@Param('id') id: string) {
    return this.favService.addAlbum(id);
  }

  @Delete('/album/:id')
  deleteAlbum(@Param('id') id: string, @Res() res) {
    this.favService
      .deleteAlbum(id)
      .then(() => res.status(HttpStatus.NO_CONTENT).send())
      .catch((resp) => {
        if (resp instanceof HttpException) {
          res.status(resp.getStatus()).send();
        }
      });
  }

  @Post('/artist/:id')
  addArtist(@Param('id') id: string) {
    return this.favService.addArtist(id);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  deleteArtist(@Param('id') id: string, @Res() res) {
    this.favService
      .deleteArtist(id)
      .then(() => res.status(HttpStatus.NO_CONTENT).send())
      .catch((resp) => {
        if (resp instanceof HttpException) {
          res.status(resp.getStatus()).send();
        }
      });
  }
}
