import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from "../../Constants/Constants";
import { UserContext } from "../UserContext/UserContext";

const NavigationStyledDiv = styled.div`
display: flex;
justify-content: flex-end;
align-items: center;
padding: 50px;
`;

const NavigationStyled = styled(Link)`
padding: 4px;
margin-right: 20px;
text-decoration: none;
border: 1px solid;
border-radius: 5px;
box-shadow: 0.1em 0.1em 0.5em #124;
background-image: linear-gradient(lightgray, white);
color: #000;
:active {
    box-shadow: inset 0 0 0.5em #124,
    inset 0 0.5em 1em rgba(0,0,0,0.4);
}
`;

const StyledLogOutButton = styled.button`
padding: 7px;
border: 1px solid;
border-radius: 5px;
box-shadow: 0.1em 0.1em 0.5em #124;
background-image: linear-gradient(lightgray, white);
color: #000;
:active {
    box-shadow: inset 0 0 0.5em #124,
    inset 0 0.5em 1em rgba(0,0,0,0.4);
}
`;

export const Navigation = () => {

    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    const handleLogout = () => {
        localStorage.removeItem(LOCAL_STORAGE_JWT_TOKEN_KEY);
        setUser(null);
        navigate('/login');
    }

    return (
        <>
        <NavigationStyledDiv>
        <NavigationStyled to='/login'>Login</NavigationStyled>
        <NavigationStyled to='/register'>Regsiter</NavigationStyled>
        {user && (
            <StyledLogOutButton onClick={handleLogout}>Log Out</StyledLogOutButton>
        )}
        </NavigationStyledDiv>
        </>
    )
};

