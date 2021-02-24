import React, { useContext } from 'react';
// import SelectDropdown from "./SelectDropdown";
import CardItemNumber from './CardItem_Number';
import SelectedPackageContext from '../../contexts/SelectedPackage';
import FormContext from '../../contexts/Form';

export const CardListSnack = ({
  groups,
  handleSelect,
  hasNone,
  stateKey,
  selected,
  selectedVariant,
  setVariant,
  groupName,
  variantKey,
}) => {
  const maxSnackCount = useContext(SelectedPackageContext);
  const form = useContext(FormContext);
  const foodItemRow =
    groups &&
    groups.map((group) => (
      <CardItemNumber
        itemsRemaining={form.snacksRemaining}
        handleItemsChange={form.handleSnackChange}
        key={group.id}
        group={group}
      />
    ));
  return (
    <div className="section__item">
      <h2 className="section__heading">{`Select your ${groupName}s`}</h2>
      <p className="section__subheading">{`Select ${maxSnackCount?.acf?.size} snacks`}</p>
      <div className="section__grid grid-x grid-margin-x align-center">
        {foodItemRow}
      </div>
    </div>
  );
};

export default CardListSnack;
