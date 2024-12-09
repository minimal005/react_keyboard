import React, { useState } from 'react';

import { getColors } from '../services/color.service';
import { Good } from '../types/Good';

type Props = {
  setIsAdd: (isAdd: boolean) => void;
  addingGood: (good: Good) => void;
};

export const GoodForm: React.FC<Props> = ({ setIsAdd, addingGood }) => {
  const [name, setName] = useState('');
  const [isErrorName, serIsErrorName] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);
  const [isErrorSelectedOption, setIsErrorSelectedOption] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim().length) {
      serIsErrorName(true);
      setName('');

      return;
    }

    if (!selectedOption) {
      setIsErrorSelectedOption(true);

      return;
    }

    setIsAdd(false);
    const colors = getColors();

    const date = new Date();

    addingGood({
      id: date.getTime(),
      colorId: selectedOption,
      name: name,
      color: colors[selectedOption - 1].name,
      quantity: 1,
    });
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    serIsErrorName(false);
    setName(event.target.value);
  };

  const handleChangeColor = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsErrorSelectedOption(false);
    setSelectedOption(+event.target.value);
  };

  return (
    <form className="GoodForm" onSubmit={handleSubmit}>
      <label>
        Name
        <input type="text" value={name} onChange={handleChangeName} />
      </label>
      {isErrorName && <span className="error">Please enter a name</span>}
      <label>
        Color
        <select value={selectedOption} onChange={handleChangeColor}>
          <option value="0" disabled>
            Choose a color
          </option>
          {getColors().map(color => (
            <option key={color.id} value={color.id}>
              {color.name}
            </option>
          ))}
        </select>
      </label>
      {isErrorSelectedOption && (
        <span className="error">Please choose a color</span>
      )}
      {/* button 'Add' */}
      <div className="formButtons buttons">
        <button className="button is-success is-outlined">Save</button>
        <button className="button" onClick={() => setIsAdd(false)}>
          Close
        </button>
      </div>
    </form>
  );
};
