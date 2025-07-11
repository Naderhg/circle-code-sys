import { useState } from "react";
import BlueCover from "./components/BlueCover";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function AuthPage() {
  const [isSignin, setIsSignIn] = useState(false);
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white relative rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full grid grid-cols-1 md:grid-cols-2">
        <SignIn />
        <SignUp />
        <BlueCover isSignIn={isSignin} setIsSignIn={setIsSignIn} />
      </div>
    </div>
  );
}

export default AuthPage;
