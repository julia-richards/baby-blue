import {
  FieldError,
  Input,
  Label,
  Text,
  NumberField as AriaNumberField,
} from "react-aria-components";

import "./NumberField.css";

export default function NumberField({
  label,
  description,
  errorMessage,
  ...props
}) {
  return (
    <AriaNumberField isInvalid={Boolean(errorMessage)} {...props}>
      <Label>{label}</Label>
      <Input />
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
    </AriaNumberField>
  );
}
