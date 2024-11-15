import {
  FieldError,
  Label,
  Text,
  TextArea as AriaTextArea,
  TextField as AriaTextField,
} from "react-aria-components";

import "./TextField.css";

export default function TextArea({
  label,
  description,
  errorMessage,
  ...props
}) {
  const htmlId = props.id || props.name;

  return (
    <AriaTextField {...props}>
      <Label>{label}</Label>
      <AriaTextArea />
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
    </AriaTextField>
  );
}
