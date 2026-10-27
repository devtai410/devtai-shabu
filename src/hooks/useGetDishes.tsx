import {dishes} from '@/data/mock';

// Preserve the template's hook contract for the future API integration.
export const useGetDishes = () => ({
  dishes,
  loading: false,
});
