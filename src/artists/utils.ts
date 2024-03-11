import { CreateArtistDto } from './dto/artist.dto';

export const validateArtistDto = (dto: CreateArtistDto) => {
  return (
    dto &&
    'name' in dto &&
    'grammy' in dto &&
    !!dto.name &&
    typeof dto.grammy === 'boolean' &&
    typeof dto.name === 'string'
  );
};
