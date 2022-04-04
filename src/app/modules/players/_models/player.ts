import { BaseModel } from '../../../_metronic/shared/crud-table';

export interface Player extends BaseModel {
  id: Number;
  user_id: Number;
  document_type: String;
  document_number: String;
  name: String;
  lastname: String;
  birthday?: String;
  gender?: String;
  country_id?: Number;
  state_id?: Number;
  city_id?: Number;
  parish_id?: Number;
  address?: String;
  phone?: String;
  treatment?: String;
  available?: String;
  risk?: Number;
  points?: String;
  language_id?: Number;
  timezone?: String;
  format_quot?: String;
  offer?: String;
  ip?: String;
  browser?: String;
  created_at?: String;
  updated_at?: String;
  total?: Number;
}
