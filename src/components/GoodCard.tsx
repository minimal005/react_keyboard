import React, { useEffect, useState } from 'react';

import { Good } from '../types/Good';

type Props = {
  good: Good;
  updateGood: (goodId: number, goodQuantity: number) => void;
  filterGood: (v: number) => void;
  isEdited: boolean;
};
export const GoodCard: React.FC<Props> = props => {
  const { good, updateGood, filterGood, isEdited } = props;
  const [goodQuantity, setGoodQuantity] = useState(good.quantity);

  const handleClick = (sign: string) => {
    if (sign === '+') {
      setGoodQuantity(prev => prev + 1);
    }

    if (sign === '-') {
      if (goodQuantity === 0) {
        return;
      }

      setGoodQuantity(prev => prev - 1);
    }
  };

  useEffect(() => {
    if (goodQuantity > 0) {
      updateGood(good.id, goodQuantity);
    } else {
      filterGood(good.id);
    }
  }, [goodQuantity]);

  return (
    <>
      <article className="GoodCard">
        <p style={{ color: good.color }}>{good.name}</p>
        {goodQuantity > 0 && isEdited && (
          <button onClick={() => handleClick('-')} className="button">
            -
          </button>
        )}
        {goodQuantity > 0 && (
          <span className="has-text-danger">{good.quantity}</span>
        )}

        {isEdited && (
          <button onClick={() => handleClick('+')} className="button">
            +
          </button>
        )}

        {isEdited && <button onClick={() => filterGood(good.id)}>❌</button>}
      </article>
    </>
  );
};
