import React, { useState, useEffect } from 'react';
import classes from './One.module.css';
import { Checkbox } from '@mui/material';
import StepIndicator from './StepIndicator';
import { useNavigate } from 'react-router-dom';

const data = [
    {
        cost: 500000,
        fee: 5900,
    }
]

const One = () => {
  const [isDropshipper, setIsDropshipper] = useState(false);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dropshipperName, setDropshipperName] = useState('');
  const [dropshipperNumber, setDropshipperNumber] = useState('');
  const [address, setAddress] = useState('');
  const [total, setTotal] = useState(data[0].cost);

  const handleDropshipperChange = (event) => {
    const isChecked = event.target.checked;
    setIsDropshipper(isChecked);

    // Disable and empty the Dropshipper form fields if unchecked
    if (!isChecked) {
      setDropshipperName('');
      setDropshipperNumber('');
    }

    // Update the total based on the Dropshipper checkbox
    const totalCost = calculateTotal(isChecked);
    setTotal(totalCost);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    const input = event.target.value.replace(/[^0-9()+-]/g, '');
    setPhoneNumber(input);
  };

  const handleDropshipperNameChange = (event) => {
    setDropshipperName(event.target.value);
  };

  const handleDropshipperNumberChange = (event) => {
    const input = event.target.value.replace(/[^0-9()+-]/g, '');
    setDropshipperNumber(input);
  };

  const handleAddressChange = (event) => {
    const input = event.target.value.slice(0, 120);
    setAddress(input);
  };

  const isEmailValid = (email) => {
    if (!email.includes('@')) {
        !isEmailValid;
    }
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isPhoneNumberValid = (phoneNumber) => {
    if (phoneNumber.length < 6 && phoneNumber.length > 20) {
        !isPhoneNumberValid;
    }
    return /^[0-9()+-]{6,20}$/.test(phoneNumber);
  };

  const calculateTotal = () => {
    let totalCost = data[0].cost;
    let fee = 0;

    if (isDropshipper) {
      fee = data[0].fee;
    }

    totalCost += fee;

    return totalCost;
  };

  useEffect(() => {
    // Recalculate the total whenever the Dropshipper checkbox or Dropshipper form fields change
    const totalCost = calculateTotal();
    setTotal(totalCost);
  }, [isDropshipper]);

  const navigate = useNavigate();

  const isContinueToPaymentDisabled = !email || !isEmailValid(email) || !phoneNumber || !isPhoneNumberValid(phoneNumber);

  const handleContinueToPayment = () => {
    if (isDropshipper) {
      navigate('/twofee'); 
    } else {
      navigate('/two'); 
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.stepIndicatorContainer}>
        <StepIndicator currentStep={0} />
      </div>
      <div className={classes.background}>
        <div className={classes.content}>
          <div className={classes.first}>
            <div className={classes.header}>
              <h2>Delivery Details</h2>
              <p>
                <Checkbox checked={isDropshipper} onChange={handleDropshipperChange} /> Send as dropshipper
              </p>
            </div>

            <form>
              <div className={classes.row}>
                <div className={`${classes.inputContainer} ${email && isEmailValid(email) ? classes.validInput : classes.invalidInput}`}>
                  <input 
                    type="text" 
                    id="email" 
                    required 
                    placeholder="Email" 
                    value={email} 
                    onChange={handleEmailChange} 
                  />
                </div>
                {isDropshipper && (
                  <div className={classes.inputContainerEven}>
                    <input
                      type="text"
                      id="dropshipper"
                      required
                      placeholder="Dropshipper name"
                      value={dropshipperName}
                      onChange={handleDropshipperNameChange}
                      className={classes.validInput}
                    />
                  </div>
                )}
              </div>
              <div className={classes.row}>
                <div className={`${classes.inputContainer} ${phoneNumber && isPhoneNumberValid(phoneNumber) ? classes.validInput : classes.invalidInput}`}>
                  <input
                    type="text"
                    id="number"
                    required
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                  />
                </div>
                {isDropshipper && (
                  <div className={classes.inputContainerEven}>
                    <input
                      type="text"
                      id="dropshipperNumber"
                      required
                      placeholder="Dropshipper number"
                      value={dropshipperNumber}
                      onChange={handleDropshipperNumberChange}
                      className={classes.validInput}
                    />
                  </div>
                )}
              </div>
              <div className={classes.address}>
                <textarea
                  type="text"
                  id="description"
                  rows="5"
                  placeholder="Delivery Address"
                  value={address}
                  onChange={handleAddressChange}
                />
                <span>{120 - address.length} characters remaining</span>
              </div>
            </form>
          </div>

          <div className={classes.second}>
            <div className={classes.summary}>
              <h2>Summary</h2>
              <p>10 items purchased</p>

              <div className={classes.details}>
                <div className={classes.goods}>
                  <p>Cost of goods</p>
                  <h3>{data[0].cost.toLocaleString()}</h3>
                </div>
                {isDropshipper && (
                  <div className={classes.fee}>
                    <p>Dropshipping fee</p>
                    <h3>{data[0].fee.toLocaleString()}</h3>
                  </div>
                )}
                <div className={classes.total}>
                  <h2>Total</h2>
                  <h2>{total.toLocaleString()}</h2>
                </div>
                <div className={classes.button}>
                  <button 
                    onClick={handleContinueToPayment} 
                    disabled={isContinueToPaymentDisabled}
                    className={isContinueToPaymentDisabled ? classes.disabledButton : classes.button}
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default One;
