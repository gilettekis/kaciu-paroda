import styled from "styled-components";

const StyledInput = styled.input`
position: relative;
display: flex;
width: 200px;
padding-top: 5px;
margin-top: 20px;
border-radius: 8px;
box-shadow: 3px 3px 3px;
`;

export const InputWrapper = ({ ...props }) => {
    return <StyledInput {...props}/>
};