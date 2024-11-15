import {
  FieldError,
  Input,
  Label,
  Text,
  TextField as AriaTextField,
} from "react-aria-components";

import "./TextField.css";

export default function TextField({
  label,
  description,
  errorMessage,
  ...props
}) {
  return (
    <AriaTextField {...props}>
      <Label>{label}</Label>
      <Input />
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
    </AriaTextField>
  );
}
