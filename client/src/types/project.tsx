import { Url } from './url';
import { Technology } from './technology';

export interface IProject {
  _id: string;
  name: string;
  tagline: string;
  urls: [Url];
  technologies: [Technology];
  image_location: string;
  tags: [string];
}
