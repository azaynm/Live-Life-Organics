

import { Navigate } from "react-router-dom";
const RoleProtected = ({ isAdmin, children }) => {
    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }
    return children;
};
export default RoleProtected;