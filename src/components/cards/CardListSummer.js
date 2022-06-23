import React from 'react';
// import SelectDropdown from "./SelectDropdown";
import CardItemNumber from './CardItem_Number';
// import FormContext from '../../contexts/Form';

export const CardListSummer = ({
  groups,
  handleSelect,
  hasNone,
  stateKey,
  selected,
  selectedVariant,
  setVariant,
  groupName,
  variantKey,
  itemsRemaining,
  handleItemsChange,
}) => {
  //   const form = useContext(FormContext);
  const foodItemRow =
    groups &&
    groups.map((group) => (
      <CardItemNumber
        key={group.id}
        group={group}
        itemsRemaining={itemsRemaining}
        handleItemsChange={handleItemsChange}
      />
    ));
  return (
    <div className='section__item'>
      <h2 className='section__heading'>{`Select your ${groupName}s`}</h2>
      <p className='section__subheading'>{`Select your ${itemsRemaining} items from our ${groupName} options (required)`}</p>
      <div className='section__grid grid-x grid-margin-x align-center'>{foodItemRow}</div>
    </div>
  );
};

export default CardListSummer;
