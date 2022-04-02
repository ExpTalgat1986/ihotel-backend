export type FOOD_TYPE_NAME = 'FOOD';
export type HOTEL_SERVICE_TYPE_NAME = 'HOTEL_SERVICE';
export type ADDITIONAL_SERVICE_TYPE_NAME = 'ADDITIONAL_SERVICE';

export type OrderListType = {
  id: number;
  quantity: number;
  price: number;
  type: FOOD_TYPE_NAME | HOTEL_SERVICE_TYPE_NAME | ADDITIONAL_SERVICE_TYPE_NAME;
};
