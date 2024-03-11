import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { AlbumsService } from './album.service';
import { CreateAlbumDto, UpdateAlbumDto } from './dto/album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}

  @Get()
  getAll() {
    return this.albumsService.getAllAlbums();
  }
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.albumsService.getOneAlbum(id);
  }

  @Post()
  create(@Body() trackDto: CreateAlbumDto) {
    return this.albumsService.createAlbum(trackDto);
  }
  @Put(':id')
  updateAlbum(@Param('id') id: string, @Body() dto: UpdateAlbumDto) {
    return this.albumsService.updateAlbum(id, dto);
  }
  @Delete(':id')
  deleteAlbum(@Param('id') id: string, @Res() res) {
    this.albumsService
      .deleteAlbum(id)
      .then(() => res.status(HttpStatus.NO_CONTENT).send())
      .catch((resp) => {
        if (resp instanceof HttpException) {
          res.status(resp.getStatus()).send();
        }
      });
  }
}
