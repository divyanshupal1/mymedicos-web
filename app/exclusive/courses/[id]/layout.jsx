/* eslint-disable @next/next/no-img-element */
import React from "react";
import { decodeToken } from "@/lib/getDecodedToken.js";

const CourseLayout = async ({
    children,
}) => {
    
    const { token, error } = decodeToken();
    if (error || !token) return <div>{error}</div>;

    return (
        <div className="w-full">
            <div className="w-full overflow-x-hidden">{children}</div>
        </div>
    );
};

export default CourseLayout;
