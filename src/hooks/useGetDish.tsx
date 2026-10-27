import {dishes} from '@/data/mock';

export const useGetDish = (id: number) => ({
  dish: dishes.find((dish) => dish.id === id) ?? null,
  isLoading: false,
});
