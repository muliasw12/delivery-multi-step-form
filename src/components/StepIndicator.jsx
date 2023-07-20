import React from 'react';
import classes from './StepIndicator.module.css';

const StepIndicator = ({ currentStep }) => {
  const steps = ['Delivery', 'Payment', 'Finish'];

  return (
    <div className={classes.stepIndicator}>
      {steps.map((step, index) => (
        <div key={index} className={classes.step}>
          <span
            className={index <= currentStep ? classes.activeStep : classes.inactiveStep}
          >
            {step}
          </span>
          {index < steps.length - 1 && <div className={classes.line} />}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
