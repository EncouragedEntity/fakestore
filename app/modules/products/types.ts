export interface Product {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,
}


export interface State {
  events: { [key: string]: boolean; };
  data: Array<Partial<Product>>;
}