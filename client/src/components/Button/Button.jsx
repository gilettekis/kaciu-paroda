import styled from "styled-components";

const ButtonStyled = styled.button`
position: relative;
display: flex;
justify-content: center;
align-items: center;
width: 100px;
height: 30px;
margin-top: 25px;
border-radius: 5px;
box-shadow: 0.1em 0.1em 0.5em #124;
background-image: linear-gradient(lightgray, white);
:active {
    box-shadow: inset 0 0 0.5em #124,
    inset 0 0.5em 1em rgba(0,0,0,0.4);
}
`;

export const ButtonWrapper = ({ children }) => {
    return <ButtonStyled>{children}</ButtonStyled>
};
export default ButtonWrapper;
