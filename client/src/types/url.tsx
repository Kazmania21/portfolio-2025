import { IUrlType } from "./url_type";

export interface IUrl {
  type: IUrlType;
  url: string;
  id: string;
}
