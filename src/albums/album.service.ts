import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DATA } from 'src/data-base';
import { Album } from 'src/types/types';
import { v4 as uuidv4, validate } from 'uuid';
import { CreateAlbumDto, UpdateAlbumDto } from './dto/album.dto';

@Injectable()
export class AlbumsService {
  async createAlbum(dto: CreateAlbumDto) {
    const id = uuidv4();
    const album: Album = {
      id,
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId || null,
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
    const albumInd = await DATA.albums.findIndex((u) => u.id === id);
    if (albumInd === -1) {
      throw new NotFoundException('Album with the provided id is not found');
    }
    const album = DATA.albums[albumInd];

    const updatedAlbum: Album = {
      ...album,
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId || null,
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
    await DATA.albums.splice(albumInd, 1);
  }
}
