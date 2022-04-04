import { BaseModel } from '../../../_metronic/shared/crud-table';

export interface League extends BaseModel {
  id: Number;
  name: String;
  name_uk: String;
  category_id: Number;
  country_id: Number;
  importance: Number,
  match_structure_id: Number;
}
