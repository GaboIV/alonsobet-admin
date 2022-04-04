import { BaseModel } from '../../../_metronic/shared/crud-table';
import { BetType } from './bet-type';
import { Category } from './category';

export interface MatchStructure extends BaseModel {
  id: Number;
  annotation_name_plural?: String;
  annotation_name_singular?: String;
  category_id?: Number;
  category?: Category;
  division_name_plural?: String;
  division_name_singular?: String;
  division_number?: Number;
  principal?: Boolean;
  halftime?: Number;
  type?: String;
  main_bet_types?: Array<BetType>
}
