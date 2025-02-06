import { IOrderDetail } from "../services/order";
export interface ingredientType {
  _id: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number
}

export interface ingredientTypeConstructor extends ingredientType {
  uuid: string
}

export type TMessageFromSocket = {
  success: boolean;
  orders: IOrderDetail[],
  total: number,
  totalToday: number
}