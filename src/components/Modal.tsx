import React from 'react';

type Props = {
  handleRemoveAll: () => void;
  setIsModal: (v: boolean) => void;
};

export const Modal: React.FC<Props> = ({ handleRemoveAll, setIsModal }) => {
  const handleModalConfirmation = () => {
    setIsModal(false);
    handleRemoveAll();
  };

  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Warning</p>
          <button className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          <div>Are you sure you want to remove all products?</div>
        </section>
        <footer className="modal-card-foot">
          <div className="buttons">
            <button
              className="button is-success is-outlined"
              onClick={handleModalConfirmation}
            >
              {' '}
              Yes, Remove All
            </button>
            <button
              className="button is-danger is-outlined"
              onClick={() => setIsModal(false)}
            >
              Cancel{' '}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
