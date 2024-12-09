import { useCallback, useState } from 'react';

import { GoodsList } from './components/GoodsList';
import { GoodForm } from './components/GoodForm';
import { Modal } from './components/Modal';
import {
  addNewGood,
  filterGoods,
  preparedGoods,
  sortedGoods,
  updateQuantityGoods,
} from './services/good.services';

import { Good } from './types/Good';

import cn from 'classnames';
import './App.scss';

export const App = () => {
  const [goods, setGoods] = useState<Good[]>(preparedGoods);
  const [sortAscOrDesc, setSortAscOrDesc] = useState<'asc' | 'desc' | null>(
    null,
  );
  const [fieldBySort, setFieldBySort] = useState('');
  const [isAdd, setIsAdd] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  const updatingGoods = useCallback(
    (goodId: number, goodQuantity: number) => {
      setGoods(updateQuantityGoods(goods, goodId, goodQuantity));
    },
    [goods],
  );

  const filteringGoods = useCallback(
    (goodId: number) => {
      setGoods(filterGoods(goods, goodId));
    },
    [goods],
  );

  const sortingField = (field: string) => {
    if (!sortAscOrDesc) {
      setSortAscOrDesc('asc');
      setFieldBySort(field);
      setGoods(sortedGoods(goods, field, 'asc'));
    } else if (sortAscOrDesc === 'asc' && fieldBySort === field) {
      setSortAscOrDesc('desc');
      setGoods(sortedGoods(goods, field, 'desc'));
    } else if (sortAscOrDesc === 'desc' && fieldBySort === field) {
      setSortAscOrDesc('asc');
      setGoods(sortedGoods(goods, field, 'asc'));
    } else {
      setSortAscOrDesc('asc');
      setFieldBySort(field);
      setGoods(sortedGoods(goods, field, 'asc'));
    }
  };

  const handleRemoveAll = useCallback(() => {
    setGoods([]);
  }, []);

  const addingGood = useCallback(
    (good: Good) => {
      setGoods(addNewGood(goods, good));
    },
    [goods],
  );

  return (
    <div className="App">
      {isModal && (
        <Modal handleRemoveAll={handleRemoveAll} setIsModal={setIsModal} />
      )}
      <h1 className="title is-2">Cart</h1>
      <div className="buttons">
        <button
          onClick={() => sortingField('Sort By Name')}
          disabled={goods.length <= 1}
          className="button is-success is-light"
        >
          Sort By Name
        </button>
        <button
          onClick={() => sortingField('Sort By Quantity')}
          disabled={goods.length <= 1}
          className="button is-success is-light"
        >
          Sort By Quantity
        </button>
      </div>

      <div className="goodsBody">
        {!goods.length && (
          <div className="block error-goodList">The product list is empty</div>
        )}

        {!!goods.length && (
          <GoodsList
            goods={goods}
            updatingGoods={updatingGoods}
            filteringGoods={filteringGoods}
            isEdited={isEdited}
          />
        )}

        {isAdd && (
          <div className="newGood">
            <h4 className="title is-4">Add new good</h4>
            <GoodForm setIsAdd={setIsAdd} addingGood={addingGood} />
          </div>
        )}
      </div>

      <div className="buttons">
        {/* {isAdd && ( */}
        <button
          onClick={() => setIsAdd(!isAdd)}
          disabled={isAdd}
          className={cn('button is-success', {
            'is-light': isAdd,
            'is-outlined': !isAdd,
          })}
        >
          Add
        </button>

        {!!goods.length && (
          <button
            onClick={() => setIsEdited(!isEdited)}
            className="button is-success is-outlined"
          >
            {isEdited ? 'Save' : 'Edit'}
          </button>
        )}

        {!!goods.length && (
          <button
            className="button is-danger is-outlined"
            onClick={() => setIsModal(true)}
          >
            Remove All
          </button>
        )}
      </div>
    </div>
  );
};
