export type FetchPizzasArgs = {
    currentPage: number;
    category: string;
    sortBy: string;
    sortOrder: string;
    search: string;
 }

 export type Pizza = {
    id: string;
    title: string;
    imageUrl: string;
    price: number;
    sizes: number[];
    types: number[];
    rating: number;
  }
  
  export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
  }
  
  export interface PizzaSliceState {
    items: Pizza[];
    status: Status;
  }