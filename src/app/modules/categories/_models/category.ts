import { BaseModel } from '../../../_metronic/shared/crud-table';

export interface Category extends BaseModel {
  id: Number;
  name: String;
  data?: String;
  acro_3?: String;
  image?: String;
  importance?: Number;
  name_id?: String;
}
