import { BaseModel } from '../../../_metronic/shared/crud-table';
import { Bank } from './bank';

export interface Account extends BaseModel {
  id: Number;
  name?: String;
  number?: String;
  document?: String;
  email?: String;
  type?: String;
  bank_id?: Number;
  bank?: Bank;
}
