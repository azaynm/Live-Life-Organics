

import { Navigate } from "react-router-dom";
const RoleProtected = ({ role, children }) => {
    if (!role.includes("systemAdmin") && !role.includes("eventCoordinator")) {
        return <Navigate to="/" replace />;
    }
    return children;
};
export default RoleProtected;