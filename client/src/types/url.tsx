import { IUrlType } from "./url_type";

export interface IUrl {
  type: IUrlType;
  url: string;
  _id: string;
}
