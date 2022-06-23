import React, { useState } from 'react';
// import SplitButton from "./SplitButton";

const CardItemNumber = ({ group, itemsRemaining, handleItemsChange }) => {
  // console.log(selected.id);
  // console.log(group.id);
  // const maxSnackCount = useContext(SelectedPackageContext);
  const [count, setCount] = useState(0);
  const increment = () => {
    +itemsRemaining > 0 && setCount(count + 1);
    +itemsRemaining > 0 && handleItemsChange(group, count + 1);
  };
  const decrement = () => {
    count > 0 && setCount(count - 1);
    count > 0 && handleItemsChange(group, count - 1);
  };
  // useEffect(() => {
  //     setCount(
  //         form?.selectedSnacks.find(snack => +snack.snack.id === +group.id)
  //             ?.snack.count || 0
  //     );
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return (
    <div
      className={'card small-12 medium-6 large-4 card__item card__item--picture '}
      key={group.id}
    >
      {group?.thumbnail && (
        <div
          className='card-img card-img--no-filter'
          style={{ backgroundImage: `url(${group.thumbnail})` }}
        />
      )}
      <div className='card-divider'>{group.post_title}</div>
      <div className='card-info'>
        {+group.acf.extra_charge ? (
          <span>{`+ $${parseFloat(group.acf.extra_charge).toFixed(2)}`}</span>
        ) : null}
        {+group.acf.calories ? <span>{`Cal: ${group.acf.calories}`}</span> : null}
      </div>
      <div
        style={{ paddingTop: +group.acf?.extra_charge ? 0 : '1rem' }}
        className='card-section card-section--snack align-right'
      >
        <button
          onClick={(e) => {
            e.preventDefault();
          }}
          className={'input-group select-button select-button--is-snack'}
        >
          <span
            onClick={decrement}
            className={
              'input-group-label select-button__icon select-button__icon--before fa fa-minus'
            }
          />
          <span className='input-group-field select-button__text select-button__text--no-bg select-button__text--square'>
            {count}
          </span>
          <span
            onClick={increment}
            className={
              'input-group-label select-button__icon select-button__icon--after fa fa-plus'
            }
          />
        </button>
      </div>
    </div>
  );
};

export default CardItemNumber;
