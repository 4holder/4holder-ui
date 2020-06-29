import React from "react";
import NumberFormat from "react-number-format";
import {NumberFormatCustomProps} from "./NumberFormatTypes";

export default function CNPJFormat(props: NumberFormatCustomProps) {
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
      format="##.###.###/####-##"
      mask="_"
      isNumericString
    />
  );
}