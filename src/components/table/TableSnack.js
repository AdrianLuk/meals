import React, { Fragment, useContext } from 'react';
import './table.scss';
import FormContext from '../../contexts/Form';
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
  selectedPackage,
  goal,
  shipping,
  selectedDelivery,
  deliveryOption,
  total,
  snacks,
}) => {
  const form = useContext(FormContext);
  const appContext = useContext(AppContext);

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
          <td>{`$${parseFloat(selectedPackage.acf.price).toFixed(2)}`}</td>
        </tr>
        {snacks?.map((snack, index) => (
          <Fragment key={index}>
            <tr className='table__row table__row--bold table__row--indent-1'>
              <td>{`${snack.snack.post_title} ${
                +snack?.snack?.acf?.extra_charge
                  ? `(+$${parseFloat(snack?.snack?.acf?.extra_charge).toFixed(2)} each)`
                  : ''
              }`}</td>
              <td className='text-center'>{`x${snack.count}`}</td>
              <td />
            </tr>
          </Fragment>
        ))}
        {form.comments.length > 0 && (
          <tr className='table__row'>
            <td
              dangerouslySetInnerHTML={{
                __html: form.comments.replace(/\n/g, '<br>'),
              }}
            />
            <td />
            <td />
          </tr>
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
