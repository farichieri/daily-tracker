import {
  getAdditionalUserInfo,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "@/utils/firebase.config";
import { selectTrackerSlice } from "store/slices/trackerSlice";
import { setIsLoading } from "store/slices/layoutSlice";
import { setNewUserData } from "./newUserData";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import GoogleLoginButton from "../Layout/GoogleLoginButton/GoogleLoginButton";
import React from "react";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { today } = useSelector(selectTrackerSlice);

  const handleLogInWithGoogle = async () => {
    dispatch(setIsLoading(true));
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        token && localStorage.setItem("gcl", token);
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        const additionalInfo = getAdditionalUserInfo(result);
        if (additionalInfo?.isNewUser) {
          await setNewUserData(user);
          router.push(`/app/tracker/${today}`);
        } else {
          router.push(`/app/tracker/${today}`);
        }
      })
      .catch((error) => {
        dispatch(setIsLoading(false));
      });
  };

  return (
    <div className="login">
      <GoogleLoginButton onClick={handleLogInWithGoogle}>
        Login for free
      </GoogleLoginButton>
      <style jsx>{`
        form {
          display: flex;
          flex-direction: column;
          max-width: 300px;
          width: 100%;
          position: relative;
          align-items: center;
          margin-top: 2rem;
        }
        .inputs-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          margin: 1rem 0;
        }
        input {
          border: none;
          border-bottom: 1px solid lightgray;
          background: none;
          outline: none;
          color: var(--text-color);
          padding: 0.3rem 1rem;
          margin: 0.5rem 0;
          transition: 0.3s;
        }
        input:focus {
          background: var(--box-shadow);
        }
        button {
          cursor: pointer;
        }
        span {
          color: red;
          position: absolute;
          bottom: -2rem;
          width: 100%;
          text-align: center;
        }
        input:autofill {
          color: red;
        }
      `}</style>
    </div>
  );
};

export default Login;
