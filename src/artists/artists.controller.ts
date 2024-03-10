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
import { ArtistsService } from './artists.service';
import { CreateArtistDto, UpdateArtistDto } from './dto/artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private artistService: ArtistsService) {}

  @Get()
  getAll() {
    return this.artistService.getAllArtists();
  }
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.artistService.getOneArtist(id);
  }

  @Post()
  create(@Body() trackDto: CreateArtistDto) {
    return this.artistService.createArtist(trackDto);
  }
  @Put(':id')
  updateArtist(@Param('id') id: string, @Body() dto: UpdateArtistDto) {
    return this.artistService.updateArtist(id, dto);
  }
  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param('id') id: string) {
    return this.artistService.deleteArtist(id);
  }
}
