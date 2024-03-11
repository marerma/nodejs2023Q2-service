import { CreateTrackDto } from './dto/track.dto';

export const validateTrackDto = (dto: CreateTrackDto) => {
  return (
    dto &&
    'name' in dto &&
    'duration' in dto &&
    !!dto.name &&
    typeof dto.duration === 'number' &&
    typeof dto.name === 'string'
  );
};
