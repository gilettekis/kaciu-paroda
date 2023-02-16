import React, { Suspense } from "react";


export const RouteSuspense = ({ children }) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            {children}
        </Suspense>
    )
};