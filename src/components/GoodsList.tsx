import React from 'react';

import { GoodCard } from './GoodCard';

import { Good } from '../types/Good';

type Props = {
  goods: Good[];
  updatingGoods: (goodId: number, goodQuantity: number) => void;
  filteringGoods: (goodId: number) => void;
  isEdited: boolean;
};
export const GoodsList: React.FC<Props> = props => {
  const {
    goods,
    updatingGoods: updateGood,
    filteringGoods: filterGood,
    isEdited,
  } = props;

  return (
    <div className="GoodsList">
      <div>
        {goods.map(good => (
          <GoodCard
            key={good.id}
            good={good}
            updateGood={updateGood}
            filterGood={filterGood}
            isEdited={isEdited}
          />
        ))}
      </div>
    </div>
  );
};
