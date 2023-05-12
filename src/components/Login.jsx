/* eslint-disable no-unused-vars */
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiFillFacebook } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { CgSpinner } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import {
  FacebookAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import OtpInput from "otp-input-react";
import { useContext, useState,useRef } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../../firebase/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { UserContext } from "../context/UserContext";
import Home from "./Home";
export default function Login() {
  const inputRef = useRef()
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [Loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [User, setUser] = useState(null);

  const { setUsername, setIsLogin } = useContext(UserContext);
  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
        navigate("/");
        setIsLogin(true);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  const googleProvider = new GoogleAuthProvider();
  async function GoogleLogin() {
    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      setUsername(user.displayName)
      setIsLogin(true);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  const facebookAuthProvider = new FacebookAuthProvider();
  async function FacebookLogin() {
    try {
      const { user } = await signInWithPopup(auth, facebookAuthProvider);
      setUsername(user.displayName);
      setIsLogin(true);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  
  function handleSubmit(e) {
    e.preventDefault();
  }
  function handleUserChange(e) {
    setUsername(e.target.value);
  }
  return (
    <section className=" flex items-center justify-center h-screen ">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {User ? (
          <Home />
        ) : (
          <div className=" w-96 flex flex-col gap-4 rounded-lg p-4 shadow-xl">
            <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
              Hello Wecome!
            </h1>
            {showOTP ? (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label
                  htmlFor="otp"
                  className="font-bold text-xl text-white text-center"
                >
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container "
                ></OtpInput>
                <button
                  onClick={onOTPVerify}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {Loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <label htmlFor="" className="font-bold text-xl ">
                    name
                  </label>
                  <input
                    type="text"
                    ref={inputRef}
                    onChange={handleUserChange}
                    className="outline-none px-3 py-3 rounded-md border border-solid border-gray-300"
                    required
                    autoFocus
                  />
                  <label htmlFor="" className="font-bold text-xl">
                    phone
                  </label>
                  <PhoneInput country={"mm"} value={ph} onChange={setPh} />
                  <button
                    type="submit"
                    onClick={onSignup}
                    className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                  >
                    {Loading && (
                      <CgSpinner size={20} className="mt-1 animate-spin" />
                    )}
                    <span>Send code via SMS</span>
                  </button>
                </form>
                <div className="text-center">OR</div>
                <div className="flex justify-center items-center gap-8">
                  <button onClick={GoogleLogin}>
                    <FcGoogle className="text-3xl" />
                  </button>
                  <button onClick={FacebookLogin}>
                    <AiFillFacebook className="text-3xl text-blue-600" />
                  </button>
                </div>
                <div className="text-center text-gray-900">
                  Sign in with one of the above
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
