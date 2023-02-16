import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../UserContext/UserContext";

export const PageLayout = () => {
    const { user } = useContext(UserContext);

    if (!user) {
        return <Navigate to='/login' />
    }


    return (
        <div>
            <Outlet />
        </div>
    )
};