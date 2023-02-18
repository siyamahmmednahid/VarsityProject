import styled, {css} from "styled-components";

export const InputContainer = styled.div`
    position: relative;
    margin-bottom: 20px;
`;

export const Label = styled.label`
    font-size: 12px;
    color: var(--textColor);
    font-weight: var(--fontRegular);
    display: block;
    margin-bottom: 8px;
`;

const InputsSharedStyle = css`
    width: 100%;
    height: 38px;
    line-height: 38px;
    font-size: var(--textFontSize);
    font-weight: var(--fontRegular);
    padding: 0 10px;
    border-radius: 5px;
    color: var(--textColor);
    border: 1px solid var(--borderColor);
    transition: all 0.3s;
    &:focus {
        outline: none;
        border-color: var(--primaryColor);
        box-shadow: var(--inputFocusShadow);
        padding: 0 12px;
    }
    &::placeholder {
        color: var(--textColorLight);
        font-weight: var(--fontRegular);
    }
    @media (max-width: 767px) {
        height: 32px;
        line-height: 32px;
        padding: 0 8px;
        border-radius: 3px;
        &:focus {
            padding: 0 10px;
        }
    }
`;

export const Input = styled.input`
    ${InputsSharedStyle};
`;

export const InputSubmit = styled.input`
    width: 100%;
    height: 38px;
    line-height: 38px;
    font-size: var(--textFontSize);
    font-weight: var(--fontMedium);
    color: var(--secondaryColor);
    border: none;
    border-radius: 5px;
    background-color: var(--primaryColor);
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
        box-shadow: var(--buttonHoverShadow);
    }
    @media(max-width: 767px){
        height: 32px;
        line-height: 32px;
        padding: 0 8px;
        border-radius: 3px;
    }
`;

export const Select = styled.select`
    ${InputsSharedStyle};
    appearance: none;
    padding: 0 30px 0 10px;
    @media(max-width: 767px){
        padding: 0 24px 0 8px;
    }
`;

export const TextArea = styled.textarea`
    ${InputsSharedStyle};
    height: 100px;
    padding: 10px;
    @media(max-width: 767px){
        height: 60px;
        padding: 8px;
    }
`;