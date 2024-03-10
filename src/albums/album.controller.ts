import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
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
  @HttpCode(204)
  deleteAlbum(@Param('id') id: string) {
    return this.albumsService.deleteAlbum(id);
  }
}
