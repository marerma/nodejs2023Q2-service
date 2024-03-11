import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DATA } from 'src/data-base';
import { Artist } from 'src/types/types';
import { v4 as uuidv4, validate } from 'uuid';
import { CreateArtistDto, UpdateArtistDto } from './dto/artist.dto';
import { validateArtistDto } from './utils';

@Injectable()
export class ArtistsService {
  async createArtist(dto: CreateArtistDto) {
    if (!validateArtistDto(dto)) {
      throw new BadRequestException('Provide all required fields!');
    }
    const id = uuidv4();
    const artist: Artist = {
      id,
      name: dto.name,
      grammy: dto.grammy,
    };
    DATA.artists.push(artist);
    return artist;
  }

  async getAllArtists() {
    const artists = await DATA.artists;
    return artists;
  }

  async getOneArtist(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('ID is not a valid UUID');
    }
    const artist: Artist = await DATA.artists.find((u) => u.id === id);
    if (!artist) {
      throw new NotFoundException('Artist with the provided id is not found');
    }

    return artist;
  }

  async updateArtist(id: string, dto: UpdateArtistDto) {
    if (!validate(id)) {
      throw new BadRequestException('ID is not a valid UUID');
    }
    if (!validateArtistDto(dto)) {
      throw new BadRequestException('Provide all required fields!');
    }
    const artistInd = await DATA.artists.findIndex((u) => u.id === id);
    if (artistInd === -1) {
      throw new NotFoundException('Artist with the provided id is not found');
    }
    const artist = DATA.artists[artistInd];

    const updatedArtist: Artist = {
      ...artist,
      name: dto.name,
      grammy: dto.grammy,
    };
    DATA.artists[artistInd] = updatedArtist;

    return updatedArtist;
  }

  async deleteArtist(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('ID is not a valid UUID');
    }
    const artistInd = await DATA.artists.findIndex((u) => u.id === id);
    if (artistInd === -1) {
      throw new NotFoundException('Artist with the provided id is not found');
    }
    DATA.tracks.forEach((t) => {
      if (t.artistId === id) {
        t.artistId = null;
      }
    });
    DATA.albums.forEach((t) => {
      if (t.artistId === id) {
        t.artistId = null;
      }
    });
    await DATA.artists.splice(artistInd, 1);
    return;
  }
}
