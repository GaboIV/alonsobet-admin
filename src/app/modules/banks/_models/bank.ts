import { BaseModel } from '../../../_metronic/shared/crud-table';

export interface Bank extends BaseModel {
  id: Number;
  name: String;
  initial?: String;
}
