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
  create(@Body() artistDto: CreateArtistDto) {
    return this.artistService.createArtist(artistDto);
  }
  @Put(':id')
  updateArtist(@Param('id') id: string, @Body() dto: UpdateArtistDto) {
    return this.artistService.updateArtist(id, dto);
  }
  @Delete(':id')
  deleteArtist(@Param('id') id: string, @Res() res) {
    this.artistService
      .deleteArtist(id)
      .then(() => res.status(HttpStatus.NO_CONTENT).send())
      .catch((resp) => {
        if (resp instanceof HttpException) {
          res.status(resp.getStatus()).send();
        }
      });
  }
}
