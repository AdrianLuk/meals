import React, { Fragment, useState, useEffect } from 'react';
import SelectDropdown from '../SelectDropdown';
// import SplitButton from "./SplitButton";

const CardItemWithPic = ({
  handleSelect,
  group,
  stateKey,
  variantKey,
  setVariant,
  selected,
}) => {
  // console.log(selected.id);
  // console.log(group.id);
  const [isActive, setIsActive] = useState(false);
  const [dropdownValue, setDropdownValue] = useState({});
  useEffect(() => {
    if (selected.id === group.id) {
      // console.log(group.id);
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [selected.id, group.id, isActive]);
  const getDropdownValue = (e) => {
    setDropdownValue(e);
  };
  return (
    <Fragment>
      <div
        className={
          'card small-12 medium-6 large-4 card__item card__item--picture ' +
          (isActive ? 'card__item--active' : '')
        }
        key={group.id}
      >
        {group.thumbnail && (
          <div
            onClick={(e) => {
              e.preventDefault();
              handleSelect(isActive ? {} : group);
              variantKey && setVariant(dropdownValue);
            }}
            className="card-img"
            style={{ backgroundImage: `url(${group.thumbnail})` }}
          />
        )}
        <div className="card-divider">{group.post_title}</div>
        <div className="text-center">
          {+group.acf.extra_charge
            ? `+ $${parseFloat(group.acf.extra_charge).toFixed(2)}`
            : null}
        </div>
        <div
          style={{ paddingTop: +group.acf?.extra_charge ? 0 : '1rem' }}
          className="card-section align-right"
        >
          {group.acf.variations && (
            <SelectDropdown
              group={group}
              stateKey={stateKey}
              variantKey={variantKey}
              options={group.acf.variations}
              handleSelect={handleSelect}
              setVariant={setVariant}
              selected={selected}
              dropdownValue={dropdownValue}
              getDropdown={getDropdownValue}
            />
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSelect(isActive ? {} : group);
              variantKey && setVariant(dropdownValue);
            }}
            className={'input-group select-button '}
          >
            <span className="input-group-field select-button__text">
              {isActive ? 'Selected' : 'Select'}
            </span>
            <span
              className={
                'input-group-label select-button__icon fa ' +
                (isActive ? 'fa-check' : 'fa-arrow-right')
              }
            />
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default CardItemWithPic;
