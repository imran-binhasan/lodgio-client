import { Link, useLocation } from "react-router-dom";

const AuthNav = () => {
    const location = useLocation();
    return (
        <div className="flex justify-end bg-transparent p-4">
            <p className="text-gray-300">Already Have an account? <Link className="text-white font-medium" to={'/auth/login'}>Login</Link></p>
        </div>
    );
}; <p className="text-gray-300">Dont Have an account? <Link className="text-white font-medium" to={'/auth/register'}>Register</Link></p>

export default AuthNav;