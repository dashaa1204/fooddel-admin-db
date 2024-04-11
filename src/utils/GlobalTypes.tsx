export type FoodDataType = {
  name: string;
  category: string;
  img: string;
  ingredients: string;
  price: number;
  sale: number;
}[];

export type CategoryDataType = { name: string; _id: string; __v: number }[];
