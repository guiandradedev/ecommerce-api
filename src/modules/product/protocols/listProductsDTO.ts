import { ComparisonOperator, ListProductParams } from "../repositories";

export type ComparisonPriceString = `${ComparisonOperator}${number}`;

export interface ListProductsRequest extends Omit<ListProductParams, "price" | "price_condition">{
  price: ComparisonPriceString
}

export function isValidPriceFilter(input: string): input is ComparisonPriceString {
  const match = input.match(/^(>=|<=|==|!=|>|<)(\d+(\.\d+)?)$/);
  if (!match) return false;

  const value = parseFloat(match[2]);
  return value >= 0;
}
