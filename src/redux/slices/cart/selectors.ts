import { RootState } from '../../store';

export const selectCart = (state: RootState) => state.cart;
export const selectTotalCount = (state: RootState) => state.cart.totalCount;
export const selectCartItemById = (id: string) => (state: RootState) => state.cart.cartItems.find(item => item.id === id);