import useSignInState from "../../hooks/useSignInState";
import BlueCover from "./components/BlueCover";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function AuthPage() {
  // get state from  URL query to determine if it's sign-in or sign-up
  const { isSignin, toggleSignIn } = useSignInState();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Back to Home Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 z-50 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 bg-white px-4 py-2 rounded-full shadow-md hover:shadow-lg"
      >
        <FaArrowLeft className="text-sm" />
        <span className="font-medium">Back to Home</span>
      </Link>

      <div className="bg-white relative rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full grid grid-cols-1 md:grid-cols-2">
        <SignIn />
        <SignUp />
        <BlueCover isSignIn={isSignin} toggleSignIn={toggleSignIn} />
      </div>
    </div>
  );
}

export default AuthPage;
