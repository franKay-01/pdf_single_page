import React, { useState } from "react";
import PhoneInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";

export function PhoneInputWithCode() {
    const [phoneNumber, setPhoneNumber] = useState("");
  
    const handlePhoneNumberChange = (value, country) => {
      setPhoneNumber(`+${country.dialCode}${value}`);
    };
  
    return (
      <PhoneInput
        containerClassName="intl-tel-input"
        inputClassName="form-control"
        defaultCountry="us"
        onChange={handlePhoneNumberChange}
        value={phoneNumber}
      />
    );
  }
  
  
  
  
  