import React, { Fragment, useContext } from 'react';
import './table.scss';
import { NO_CARB, ADDON_PRICE } from '../constants';
import { isEmptyObject } from '../utils';
import AppContext from '../../contexts/AppContext';
// const isEmptyObject = object => {
//     if (Object.entries(object).length === 0 && object.constructor === Object) {
//         return true;
//     } else {
//         return false;
//     }
// };
const Table = ({
  customizations,
  addOns,
  selectedPackage,
  goal,
  shipping,
  selectedDelivery,
  deliveryOption,
  total,
}) => {
  const appContext = useContext(AppContext);
  // console.log(selectedDelivery);
  // console.log(customizations);
  // console.log(selectedPackage);
  // console.log(goal);
  return (
    <table className='table unstriped'>
      <thead className='table__head'>
        <tr>
          <th>Order Summary</th>
          <th className='text-center'>QTY</th>
          <th className='text-center'>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr className='table__row table__row--bold'>
          <td>{selectedPackage.title.rendered}</td>
          <td />
          <td>{`$${selectedPackage.acf.price}`}</td>
        </tr>
        <tr className='table__row table__row--indent-1'>
          <td>{`${selectedPackage.acf.meal_count}-meal pack`}</td>
          <td />
          <td />
        </tr>
        {goal && (
          <tr className='table__row table__row--indent-1'>
            <td>{`${goal.acf.portion_description}`}</td>
            <td />
            <td>
              {parseFloat(goal.acf.portion_price) > 0
                ? `$${parseFloat(+goal.acf.portion_price * +selectedPackage.acf.meal_count).toFixed(
                    2
                  )}`
                : `Included`}
            </td>
          </tr>
        )}
        {customizations?.map((cust, index) => (
          <Fragment key={index}>
            <tr className='table__row table__row--bold table__row--indent-1'>
              <td>{`Customized Meal ${index + 1}`}</td>
              <td className='text-center'>{`x${cust.customization_quantity}`}</td>
              <td />
            </tr>
            {isEmptyObject(cust.fall_menu) ? (
              <>
                <tr className='table__row table__row--indent-1-5'>
                  <td>{cust.carb.variation || cust.carb.post_title || NO_CARB}</td>
                  <td />
                  <td>
                    {+cust.carb.extra_charge > 0
                      ? `$${parseFloat(
                          cust.carb.extra_charge * cust.customization_quantity
                        ).toFixed(2)}`
                      : ''}
                  </td>
                </tr>
                <tr className='table__row table__row--indent-1-5'>
                  <td>{cust.meat.variation}</td>
                  <td />
                  <td>
                    {+cust.meat.extra_charge > 0
                      ? `$${parseFloat(
                          cust.meat.extra_charge * cust.customization_quantity
                        ).toFixed(2)}`
                      : ''}
                  </td>
                </tr>
                <tr className='table__row table__row--indent-1-5'>
                  <td>{cust.vegetable.post_title}</td>
                  <td />
                  <td>
                    {cust.vegetable.acf && cust.vegetable.acf.extra_charge
                      ? `$${parseFloat(
                          cust.vegetable.acf.extra_charge * cust.customization_quantity
                        ).toFixed(2)}`
                      : ''}
                  </td>
                </tr>
              </>
            ) : (
              <tr className='table__row table__row--indent-1-5'>
                <td>{cust.fall_menu?.post_title}</td>
                <td />
                <td>
                  {+cust.fall_menu?.acf?.extra_charge > 0
                    ? `$${parseFloat(
                        cust.fall_menu?.acf?.extra_charge * cust.customization_quantity
                      ).toFixed(2)}`
                    : ''}
                </td>
              </tr>
            )}
            {cust.comments.length > 0 && (
              <tr className='table__row table__row--indent-1-5'>
                <td
                  dangerouslySetInnerHTML={{
                    __html: cust.comments,
                  }}
                />
                <td />
                <td />
              </tr>
            )}
          </Fragment>
        ))}
        {addOns.length > 0 && (
          <>
            <tr className='table__row table__row--bold'>
              <td>Snacks (+$5.00 each)</td>
              <td />
              <td>{`$${parseFloat(
                addOns.reduce(
                  (acc, curr) =>
                    +curr.count * (parseFloat(+curr.snack?.acf?.extra_charge || 0) + ADDON_PRICE) +
                    +acc,
                  0
                )
              ).toFixed(2)}`}</td>
            </tr>
            {addOns.map((addOn) => (
              <tr key={addOn.snack.id} className='table__row table__row--indent-1'>
                <td>{`${addOn.snack.post_title} ${
                  +addOn?.snack?.acf?.extra_charge
                    ? `(+$${parseFloat(addOn?.snack?.acf?.extra_charge).toFixed(2)} each)`
                    : ''
                }`}</td>
                <td className={`text-bold text-center`}>{`x${addOn.count}`}</td>
                <td />
              </tr>
            ))}
          </>
        )}
        {selectedDelivery !== 'default' && deliveryOption === 'delivery' && (
          <Fragment>
            <tr className='table__row table__row--bold'>
              <td>Delivery Location</td>
              <td />
              <td />
            </tr>
            <tr className='table__row table__row--indent-1'>
              <td>{shipping.delivery_locations[selectedDelivery].location}</td>
              <td />
              <td>{`$${parseFloat(shipping.delivery_locations[selectedDelivery].price).toFixed(
                2
              )}`}</td>
            </tr>
          </Fragment>
        )}
        {!!appContext.discount && (
          <>
            <tr className='table__row table__row--bold'>
              <td>Promotional Code</td>
              <td></td>
              <td></td>
            </tr>
            <tr className='table__row table__row--indent-1'>
              <td>{`$${appContext.discount?.discount_amount} off orders over $${appContext.discount?.minimum_order_amount}`}</td>
              <td></td>
              <td>{`- $${parseFloat(appContext.discount?.discount_amount).toFixed(2)}`}</td>
            </tr>
          </>
        )}
      </tbody>
      <tfoot className='table__footer'>
        <tr>
          <th>Order Total</th>
          <th />
          <th className='text-center'>{`$${total.toFixed(2)}`}</th>
        </tr>
      </tfoot>
    </table>
  );
};

export default Table;
