import { TechnologyType } from './technology_type';

export interface Technology {
  _id: string;
  name: string;
  url: string;
  image_location: string;
  type: TechnologyType;
}
