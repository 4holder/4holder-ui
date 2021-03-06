import React from "react";
import NumberFormat from "react-number-format";
import {NumberFormatCustomProps} from "./NumberFormatTypes";

export default function MoneyFormat(props: NumberFormatCustomProps) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
      isNumericString
      prefix="R$"
    />
  );
}