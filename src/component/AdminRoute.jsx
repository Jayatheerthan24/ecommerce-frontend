import { Navigate } from "react-router";

const AdminRoute = ({ children }) => {
    const isLogged = sessionStorage.getItem('isLogged') === 'true';
    const userRole = sessionStorage.getItem('role');

    if (!isLogged) {
        return <Navigate to='/login' />;
    }

    if (userRole !== 'admin') {
        return <Navigate to='/' />;
    }

    return children;
};

export default AdminRoute;