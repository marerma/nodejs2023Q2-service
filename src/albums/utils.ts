import { CreateAlbumDto } from './dto/album.dto';

export const validateAlbumDto = (dto: CreateAlbumDto) => {
  return (
    dto &&
    'name' in dto &&
    'year' in dto &&
    !!dto.name &&
    !!dto.year &&
    typeof dto.year === 'number' &&
    typeof dto.name === 'string'
  );
};
