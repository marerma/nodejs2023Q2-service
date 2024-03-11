import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DATA } from 'src/data-base';
import { Album } from 'src/types/types';
import { v4 as uuidv4, validate } from 'uuid';
import { CreateAlbumDto, UpdateAlbumDto } from './dto/album.dto';
import { validateAlbumDto } from './utils';

@Injectable()
export class AlbumsService {
  async createAlbum(dto: CreateAlbumDto) {
    if (!validateAlbumDto(dto)) {
      throw new BadRequestException(
        'Provide all requiered fields: name and year',
      );
    }
    const id = uuidv4();
    const album: Album = {
      id,
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId ? dto.artistId : null,
    };
    DATA.albums.push(album);
    return album;
  }

  async getAllAlbums() {
    const albums = await DATA.albums;
    return albums;
  }

  async getOneAlbum(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('ID is not a valid UUID');
    }
    const album: Album = await DATA.albums.find((u) => u.id === id);
    if (!album) {
      throw new NotFoundException('Album with the provided id is not found');
    }

    return album;
  }

  async updateAlbum(id: string, dto: UpdateAlbumDto) {
    if (!validate(id)) {
      throw new BadRequestException('ID is not a valid UUID');
    }
    if (!validateAlbumDto(dto)) {
      throw new BadRequestException(
        'Provide all requiered fields: name and year',
      );
    }
    const albumInd = await DATA.albums.findIndex((u) => u.id === id);
    if (albumInd === -1) {
      throw new NotFoundException('Album with the provided id is not found');
    }

    const album = DATA.albums[albumInd];

    const updatedAlbum: Album = {
      ...album,
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId ? dto.artistId : null,
    };
    DATA.albums[albumInd] = updatedAlbum;

    return updatedAlbum;
  }

  async deleteAlbum(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('ID is not a valid UUID');
    }
    const albumInd = await DATA.albums.findIndex((u) => u.id === id);
    if (albumInd === -1) {
      throw new NotFoundException('Album with the provided id is not found');
    }
    for (const track of DATA.tracks) {
      if (track.albumId === id) {
        track.albumId = null;
      }
    }
    await DATA.albums.splice(albumInd, 1);
    const albInFav = await DATA.favorites.albums.findIndex((a) => a === id);
    if (albInFav !== -1) {
      await DATA.favorites.albums.splice(albInFav, 1);
    }
    return;
  }
}
