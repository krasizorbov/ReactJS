import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PayPalButton } from 'react-paypal-button-v2';

export default class PayPal extends React.Component {
  render() {
    return (
      <PayPalButton
        amount='25.00'
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        onSuccess={(details, data) => {
          alert('Transaction completed by ' + details.payer.name.given_name);

          // OPTIONAL: Call your server to save the transaction
          return fetch('/paypal-transaction-complete', {
            method: 'post',
            body: JSON.stringify({
              orderID: data.orderID,
            }),
          });
        }}
      />
    );
  }
}
