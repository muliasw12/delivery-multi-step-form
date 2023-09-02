import React from 'react'
import classes from './Finish.module.css'
import StepIndicator from './StepIndicator'
import { useLocation, useNavigate } from 'react-router-dom';

const generateRandomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }
    return code;
};

const Finish = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const dataToSend = JSON.parse(params.get('selectedShipment'));
  
  // Now, you can access the individual data properties from selectedShipment
  const { selectedPayment, costData, total, selectedShipment } = dataToSend || {};

  const navigate = useNavigate();

  const orderId = generateRandomCode();

  const handleBackToHomepage = () => {
    navigate('/');
  };

  return (
    <div className={classes.container}>
      <div className={classes.stepIndicatorContainer}>
        <StepIndicator currentStep={2} />
      </div>
      <div className={classes.background}>
        <div className={classes.content}>
            <div className={classes.first}>

                <div className={classes.thanks}>
                    <div className={classes.header}>
                        <h1>Thank You!</h1>
                    </div> 

                    {/* <div className={classes.order}>
                        <h3>Order ID: {orderId}</h3>
                        <p>Your order will be delivered today with {selectedShipment ? selectedShipment.shipment : 'N/A'}</p>
                    </div> */}

                    <div className={classes.back} onClick={handleBackToHomepage}>
                        <p>&larr; Back to Homepage</p>
                    </div>
                </div>

            </div>


            <div className={classes.second}>
                <div className={classes.summary}>
                    {/* <h2>Summary</h2>
                    <p>10 items purchased</p>

                    <div className={classes.estimate}>
                        <h3>Delivery estimation</h3>
                        <p>
                        {selectedShipment
                        ? `${selectedShipment.estimation} by ${selectedShipment.shipment}`
                        : 'N/A'}
                        </p>
                    </div>

                    <div className={classes.method}>
                        <h3>Payment method</h3>
                        <p>{selectedPayment ? selectedPayment.payment : 'N/A'}</p>
                    </div>

                    <div className={classes.details}>
                        <div className={classes.goods}>
                            <p>Cost of goods</p>
                            <h3>{costData && costData[0].cost.toLocaleString()}</h3>
                        </div>
                        <div className={classes.shipment}>
                            <p>{selectedShipment ? selectedShipment.shipment : 'N/A'} Shipment</p>
                            <h3>{selectedShipment ? selectedShipment.price.toLocaleString() : 'N/A'}</h3>
                        </div>
                        <div className={classes.total}>
                            <h2>Total</h2>
                            <h2>{total && total.toLocaleString()}</h2>
                        </div>
                        
                    </div>   */}
                </div>
            </div>


        </div>
      </div>
    </div>
  )
}

export default Finish