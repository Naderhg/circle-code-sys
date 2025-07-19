import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

const useSignInState = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // More explicit boolean conversion
  const getSignInStateFromURL = useCallback(() => {
    const signinParam = searchParams.get("signin");
    return signinParam === "true";
  }, [searchParams]);

  const [isSignin, setIsSignIn] = useState(() => getSignInStateFromURL());

  // Sync state with URL changes
  useEffect(() => {
    setIsSignIn(getSignInStateFromURL());
  }, [getSignInStateFromURL]);

  // Helper function to update both state and URL
  const updateSignInState = useCallback(
    (newState) => {
      setIsSignIn(newState);

      if (newState) {
        searchParams.set("signin", "true");
      } else {
        searchParams.delete("signin");
      }

      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  // Helper function to toggle state
  const toggleSignIn = useCallback(() => {
    updateSignInState(!isSignin);
  }, [isSignin, updateSignInState]);

  return {
    isSignin,
    setIsSignIn: updateSignInState,
    toggleSignIn,
  };
};

export default useSignInState;
