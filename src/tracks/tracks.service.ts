import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DATA } from 'src/data-base';
import { Track } from 'src/types/types';
import { v4 as uuidv4, validate } from 'uuid';
import { CreateTrackDto, UpdateTrackDto } from './dto/track.dto';

@Injectable()
export class TracksService {
  async createTrack(dto: CreateTrackDto) {
    const id = uuidv4();
    const track: Track = {
      id,
      name: dto.name,
      artistId: dto.artistId ? dto.artistId : null,
      albumId: dto.albumId ? dto.albumId : null,
      duration: dto.duration,
    };
    DATA.tracks.push(track);
    return track;
  }

  async getAllTracks() {
    const tracks = await DATA.tracks;
    return tracks;
  }

  async getOneTrack(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('ID is not a valid UUID');
    }
    const track: Track = await DATA.tracks.find((u) => u.id === id);
    if (!track) {
      throw new NotFoundException('Track with the provided id is not found');
    }

    return track;
  }

  async updateTrack(id: string, dto: UpdateTrackDto) {
    if (!validate(id)) {
      throw new BadRequestException('ID is not a valid UUID');
    }
    const trackInd = await DATA.tracks.findIndex((u) => u.id === id);
    if (trackInd === -1) {
      throw new NotFoundException('Track with the provided id is not found');
    }
    const track = DATA.tracks[trackInd];

    const updatedTrack: Track = {
      ...track,
      name: dto.name,
      artistId: dto.artistId ? dto.artistId : null,
      albumId: dto.albumId ? dto.albumId : null,
      duration: dto.duration,
    };
    DATA.tracks[trackInd] = updatedTrack;

    return updatedTrack;
  }

  async deleteTrack(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('ID is not a valid UUID');
    }
    const trackInd = await DATA.tracks.findIndex((u) => u.id === id);
    if (trackInd === -1) {
      throw new NotFoundException('Track with the provided id is not found');
    }
    await DATA.tracks.splice(trackInd, 1);
  }
}
