import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DATA } from 'src/data-base';
import { FavoritesResponse } from 'src/types/types';
import { validate } from 'uuid';

@Injectable()
export class FavoritesService {
  async getAllFavs() {
    const favArtist = DATA.artists.filter((a) =>
      DATA.favorites.artists.includes(a.id),
    );
    const favAlbums = DATA.albums.filter((a) =>
      DATA.favorites.albums.includes(a.id),
    );
    const favTracks = DATA.tracks.filter((a) =>
      DATA.favorites.tracks.includes(a.id),
    );
    const favResp: FavoritesResponse = {
      artists: favArtist,
      albums: favAlbums,
      tracks: favTracks,
    };
    return favResp;
  }

  async addTrack(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('ID is not a valid UUID');
    }
    const trackToAdd = DATA.tracks.find((t) => t.id === id);
    if (!trackToAdd) {
      throw new UnprocessableEntityException(
        'Track with the provided id is not found',
      );
    }
    await DATA.favorites.tracks.push(id);
    return id;
  }

  async addAlbum(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('ID is not a valid UUID');
    }
    const albumToAdd = DATA.albums.find((t) => t.id === id);
    if (!albumToAdd) {
      throw new UnprocessableEntityException(
        'Album with the provided id is not found',
      );
    }
    await DATA.favorites.albums.push(id);
    return id;
  }

  async addArtist(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('ID is not a valid UUID');
    }
    const artistToAdd = DATA.artists.find((t) => t.id === id);
    if (!artistToAdd) {
      throw new UnprocessableEntityException(
        'Artist with the provided id is not found',
      );
    }
    await DATA.favorites.artists.push(id);
    return id;
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
  }
  async deleteArtist(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('ID is not a valid UUID');
    }
    const artistInd = await DATA.artists.findIndex((u) => u.id === id);
    if (artistInd === -1) {
      throw new NotFoundException('Artist with the provided id is not found');
    }
    for (const alb of DATA.albums) {
      if (alb.artistId === id) {
        alb.artistId = null;
      }
    }
    for (const track of DATA.tracks) {
      if (track.artistId === id) {
        track.artistId = null;
      }
    }
    await DATA.artists.splice(artistInd, 1);
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
