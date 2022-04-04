import { BaseModel } from '../../../_metronic/shared/crud-table';

export interface BetType extends BaseModel {
  id: Number;
  name: String;
  description?: String;
  adding?: String;
  index?: String;
  option?: Number;
  importance?: String;
  category_id?: String;
}
