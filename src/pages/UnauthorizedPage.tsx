import { Link } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { logOutUser } from "../store/authSlice/operations";

const UnauthorizedPage = () => {
  const dispatch = useAppDispatch()
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-red-500 mb-4">Access Denied</h1>
      <p className="text-gray-700 mb-6">
        You do not have permission to view this page.
      </p>
      <Link
        to="/login"
        onClick={() => dispatch(logOutUser())} // сброс состояния
        className="text-blue-600 hover:underline"
      >
        Return to login
      </Link>
    </div>
  );
};

export default UnauthorizedPage;