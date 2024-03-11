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
import { TracksService } from './tracks.service';
import { CreateTrackDto, UpdateTrackDto } from './dto/track.dto';

@Controller('track')
export class TracksController {
  constructor(private tracksService: TracksService) {}

  @Get()
  getAll() {
    return this.tracksService.getAllTracks();
  }
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.tracksService.getOneTrack(id);
  }

  @Post()
  create(@Body() trackDto: CreateTrackDto) {
    return this.tracksService.createTrack(trackDto);
  }
  @Put(':id')
  updateTrack(@Param('id') id: string, @Body() dto: UpdateTrackDto) {
    return this.tracksService.updateTrack(id, dto);
  }
  @Delete(':id')
  deleteTrack(@Param('id') id: string, @Res() res) {
    return this.tracksService
      .deleteTrack(id)
      .then(() => res.status(HttpStatus.NO_CONTENT).send())
      .catch((resp) => {
        if (resp instanceof HttpException) {
          res.status(resp.getStatus()).send();
        }
      });
  }
}
