import React, { useState } from "react";
import { setScreen } from "../Redux/features/Screen";
import { useDispatch } from "react-redux";
import { addDoc } from "firebase/firestore";
import { auth, collUser } from "../firebase";
import CoolAlert from "./CoolAlert";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  function signUp() {
    if (mail === "" || password === "" || name === "") {
      setError("Every input must have a valid value!");
      setTimeout(() => {
        setError("");
      }, "4000");
    } else {
    createUserWithEmailAndPassword(auth, mail, password)
      .then(() => {
        addDoc(collUser, {
          name: name,
          email: mail,
          uid: auth.currentUser.uid,
          notes: [],
        });
        // auth.currentUser.sendEmailVerification(actionCodeSettings).then(() =>)
        setSuccess("Account is created successfully!");
          setTimeout(() => {
            setSuccess("");
            dispatch(setScreen("auth"));
          }, "1500");
      })
      .catch((err) => {
        console.log(err.code);
        setError(err.message);
        switch (err.code) {
          case "auth/user-not-found":
            setError("Email or password is incorrect!");
            break;

          case "auth/invalid-email":
            setError("Email is not invalid!");
            break;

          case "auth/wrong-password":
            setError("Password is wrong!");
            break;
          
          case "auth/email-already-in-use":
            setError("There is already an account with this email!");
            break;

          default:
            setError("ERROR!");
            break;
        }
        setTimeout(() => {
          setError("");
        }, "3000");
      });
    }
  }

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <CoolAlert success={success} error={error} />
      <h1 className="p-3 spaci text-6xl font-bold mb-9 text-transparent bg-clip-text bg-gradient-to-tr from-green-700 to-violet-700">
        Register
      </h1>

      <input
        className="w-60 p-2 border-2 border-neutral-400 rounded-xl bg-transparent placeholder-neutral-500 focus:outline-none focus:border-purple-600 dark:text-neutral-50 caret-purple-600 transition-all duration-500"
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="w-60 p-2 border-2 border-neutral-400 rounded-xl bg-transparent placeholder-neutral-500 focus:outline-none focus:border-purple-600 dark:text-neutral-50 caret-purple-600 transition-all duration-500"
        type="text"
        placeholder="example@email.com"
        onChange={(e) => setMail(e.target.value)}
      />
      <input
        className="w-60 p-2 border-2 border-neutral-400 rounded-xl bg-transparent placeholder-neutral-500 focus:outline-none focus:border-purple-600 dark:text-neutral-50 caret-purple-600 transition-all duration-500"
        type="password"
        placeholder="••••••••"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="w-32 py-2 px-3 mt-6 rounded-xl bg-neutral-700 text-neutral-300 active:scale-110 hover:bg-purple-600 transition-all duration-400 select-none"
        onClick={signUp}
      >
        Register
      </button>

      <button
        className="fixed bottom-5 right-5 w-32 py-2 px-3 mt-6 rounded-xl bg-sky-700 text-neutral-300 hover:scale-110 transition-all duration-300 select-none"
        onClick={() => dispatch(setScreen("auth"))}
      >
        Login
      </button>
    </div>
  );
};

export default Register;
