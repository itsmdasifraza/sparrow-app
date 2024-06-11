import type { ContentTypeEnum } from "../enums/request.enum";

export interface RequestData {
  body?: object | string;
  headers?: {
    Authorization: string;
    version: string;
    "Content-type"?: ContentTypeEnum;
  };
}
