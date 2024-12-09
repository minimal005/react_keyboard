import { Good } from '../types/Good';
import { getColorById } from './color.service';

const goodsFromCart = [
  { id: 1, colorId: 1, name: 'Dumplings', quantity: 1 },
  { id: 2, colorId: 2, name: 'Carrot', quantity: 3 },
  { id: 3, colorId: 3, name: 'Eggs', quantity: 2 },
  { id: 4, colorId: 1, name: 'Ice cream', quantity: 2 },
  { id: 5, colorId: 2, name: 'Apple', quantity: 5 },
];

export const preparedGoods: Good[] = goodsFromCart.map(good => ({
  ...good,
  color: getColorById(good.colorId),
}));

export const sortedGoods = (
  goods: Good[],
  sortedField: string,
  sortAsc: string,
): Good[] => {
  if (!sortedField) {
    return goods;
  }

  let sortingGoods: Good[] = goods;

  if (sortedField === 'Sort By Name') {
    sortingGoods = [...goods].sort((good1, good2) =>
      good1.name.localeCompare(good2.name),
    );
  }

  if (sortedField === 'Sort By Quantity') {
    sortingGoods = [...goods].sort(
      (good1, good2) => good1.quantity - good2.quantity,
    );
  }

  if (sortAsc === 'desc') {
    return sortingGoods.reverse();
  }

  return sortingGoods;
};

export const filterGoods = (goods: Good[], goodId: number): Good[] =>
  goods.filter(good => good.id !== goodId);

export const updateQuantityGoods = (
  goods: Good[],
  goodId: number,
  quantity: number,
): Good[] =>
  goods.map(good => {
    if (good.id === goodId) {
      return { ...good, quantity: quantity };
    } else {
      return good;
    }
  });

export const addNewGood = (goods: Good[], newGood: Good) => {
  return [...goods, newGood];
};
