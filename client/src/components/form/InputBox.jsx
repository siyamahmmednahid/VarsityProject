import { Input, InputContainer, Label } from "../styled/elements/form";

const InputBox = ({ label, type, name, isRequired, placeholder }) => {
    return (
        <InputContainer>
            <Label>{label}</Label>
            <Input
                type={type}
                name={name}
                required={isRequired}
                placeholder={placeholder}
            />
        </InputContainer>
    );
}

export default InputBox;

InputBox.defaultProps = {
    label: "Label",
    type: "text",
    name: "name",
    isRequired: true,
    placeholder: "Placeholder"
}