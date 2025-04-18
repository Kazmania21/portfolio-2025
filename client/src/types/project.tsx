import { IUrl } from './url';
import { ITechnology } from './technology';

export interface IProject {
  _id: string;
  name: string;
  tagline: string;
  urls: [IUrl];
  technologies: [ITechnology];
  image_location: string;
  tags: [string];
}
