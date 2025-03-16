import { UrlType } from "./url_type";

export interface Url {
  type: UrlType;
  url: string;
  id: string;
}
