import { Button } from "../../../components/ui/button";

function BlueCover({ isSignIn, toggleSignIn }) {
  return (
    <div
      className={`absolute inset-y-0 right-0 w-1/2 bg-gradient-to-br from-blue-500 to-blue-700 p-8 md:p-12 flex flex-col justify-center items-center text-white overflow-hidden blue-cover-slide z-10 ${
        isSignIn ? "rounded-r-3xl" : "rounded-l-3xl"
      }`}
      style={{
        transform: isSignIn ? "translateX(0%)" : "translateX(-100%)",
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-blue-800/20"></div>

      {/* Animated Background Waves */}
      <div
        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
          isSignIn ? "bg-gradient-to-l" : "bg-gradient-to-r"
        } from-blue-600/30 to-transparent`}
      ></div>

      <div
        className={`relative z-10 text-center transition-all duration-500 delay-300 ${
          isSignIn ? "transform translate-x-0" : "transform translate-x-0"
        }`}
      >
        <h3 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
          {isSignIn ? "Hello, Friend" : "Welcome Back"}
        </h3>
        <p className="text-blue-100 text-lg mb-8 leading-relaxed animate-fade-in-delay">
          {isSignIn
            ? "Register with your personal details to use the shipping system"
            : "Already have an account? Sign in to access all shipping system features"}
        </p>

        <Button
          variant="outline"
          className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-all duration-300 bg-transparent hover:scale-105 active:scale-95"
          onClick={() => toggleSignIn()}
        >
          {isSignIn ? "SIGN UP" : "SIGN IN"}
        </Button>
      </div>

      {/* Decorative Elements with Animation */}
      <div
        className={`absolute top-10 w-20 h-20 bg-white/10 rounded-full transition-all duration-700 ease-in-out ${
          isSignIn ? "right-10 animate-float" : "left-10 animate-float-reverse"
        }`}
      ></div>

      <div
        className={`absolute bottom-10 w-16 h-16 bg-white/10 rounded-full transition-all duration-700 delay-100 ease-in-out ${
          isSignIn
            ? "left-10 animate-float-slow"
            : "right-10 animate-float-slow-reverse"
        }`}
      ></div>

      <div
        className={`absolute top-1/2 w-32 h-32 bg-white/5 rounded-full transition-all duration-700 delay-200 ease-in-out ${
          isSignIn
            ? "right-0 transform translate-x-16 animate-pulse-slow"
            : "left-0 transform -translate-x-16 animate-pulse-slow"
        }`}
      ></div>

      {/* Additional Floating Elements */}
      <div
        className={`absolute top-1/4 w-8 h-8 bg-white/5 rounded-full transition-all duration-700 delay-300 ease-in-out ${
          isSignIn
            ? "right-1/4 animate-float-tiny"
            : "left-1/4 animate-float-tiny-reverse"
        }`}
      ></div>

      <div
        className={`absolute bottom-1/4 w-12 h-12 bg-white/10 rounded-full transition-all duration-700 delay-150 ease-in-out ${
          isSignIn
            ? "right-1/3 animate-float-medium"
            : "left-1/3 animate-float-medium-reverse"
        }`}
      ></div>
    </div>
  );
}

export default BlueCover;
