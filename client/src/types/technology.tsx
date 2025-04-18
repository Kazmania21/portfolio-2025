import { ITechnologyType } from './technology_type';

export interface ITechnology {
  _id: string;
  name: string;
  url: string;
  image_location: string;
  type: ITechnologyType;
}
