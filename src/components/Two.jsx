import React, { useState } from 'react';
import classes from './Two.module.css';
import { useNavigate, Link } from 'react-router-dom';
import StepIndicator from './StepIndicator';

const costData = [{ cost: 500000 }];

const shipmentData = [
  {
    shipment: 'GO-SEND',
    price: 15000,
    estimation: 'today',
  },
  {
    shipment: 'JNE',
    price: 9000,
    estimation: '2 days',
  },
  {
    shipment: 'Personal Courier',
    price: 29000,
    estimation: '1 day',
  },
];

const paymentData = [
  {
    id: 1,
    payment: 'eWallet',
  },
  {
    id: 2,
    payment: 'Bank Transfer',
  },
  {
    id: 3,
    payment: 'Virtual Account',
  },
];

const Two = () => {
  const [selectedShipment, setSelectedShipment] = useState(shipmentData[0]);
  const [selectedPayment, setSelectedPayment] = useState(paymentData[0]);

  const navigate = useNavigate();

  const handleShipmentSelection = (shipment) => {
    setSelectedShipment(shipment);
  };

  const handlePaymentSelection = (payment) => {
    setSelectedPayment(payment);
  };

  const handleBackToDeliveryDetails = () => {
    navigate('/');
  };

  const handlePayment = () => {
    const dataToSend = {
        selectedShipment,
        selectedPayment,
        costData,
        total: costData[0].cost + selectedShipment.price,
    };

    navigate(`/finish?selectedShipment=${encodeURIComponent(JSON.stringify(dataToSend))}`);

  };

  return (
    <div className={classes.container}>
      <div className={classes.stepIndicatorContainer}>
        <StepIndicator currentStep={1} />
      </div>
      <div className={classes.background}>
        <div className={classes.content}>
          <div className={classes.first}>
            <div className={classes.back} onClick={handleBackToDeliveryDetails}>
              <p>&larr; Back to Delivery Details</p>
            </div>
            <div className={classes.header}>
              <h2>Shipment</h2>
            </div>

            <div className={classes.box}>
              {shipmentData.map((shipmentItem) => (
                <div
                  key={shipmentItem.shipment}
                  className={`${classes.pay} ${
                    selectedShipment.shipment === shipmentItem.shipment ? classes.selected : ''
                  }`}
                  onClick={() => handleShipmentSelection(shipmentItem)}
                >
                  <h3>{shipmentItem.shipment}</h3>
                  <p>{shipmentItem.price.toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className={classes.header}>
              <h2>Payment</h2>
            </div>

            <div className={classes.payment}>
              <div className={classes.box}>
                {paymentData.map((paymentItem) => (
                  <div
                    key={paymentItem.id}
                    className={`${classes.pay} ${
                      selectedPayment.payment === paymentItem.payment ? classes.selected : ''
                    }`}
                    onClick={() => handlePaymentSelection(paymentItem)}
                  >
                    <h3>{paymentItem.payment}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={classes.second}>
            <div className={classes.summary}>
              <h2>Summary</h2>
              <p>10 items purchased</p>

              <div className={classes.estimate}>
                <h3>Delivery estimation</h3>
                <p>
                  {selectedShipment.estimation} by {selectedShipment.shipment}
                </p>
              </div>

              <div className={classes.details}>
                <div className={classes.goods}>
                  <p>Cost of goods</p>
                  <h3>{costData[0].cost.toLocaleString()}</h3>
                </div>
                <div className={classes.shipment}>
                  <p>{selectedShipment.shipment} shipment</p>
                  <h3>{selectedShipment.price.toLocaleString()}</h3>
                </div>
                <div className={classes.total}>
                  <h2>Total</h2>
                  <h2>{(costData[0].cost + selectedShipment.price).toLocaleString()}</h2>
                </div>
                <div className={classes.button}>
                    <Link to="/finish" onClick={handlePayment}>
                        <button>Pay with {selectedPayment.payment}</button>
                    </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Two;
