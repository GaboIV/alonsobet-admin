import { BaseModel } from '../../../_metronic/shared/crud-table';

export interface Country extends BaseModel {
  id: Number;
  name: String;
  acro_2?: String;
  iso31661?: String;
  acro_3?: String;
  image_link?: String;
  flag_image_link?: String;
  importance?: Number;
  name_id?: String;
}
