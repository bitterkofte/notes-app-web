import React, { useState } from "react";
import { setScreen } from "../Redux/features/Screen";
import { useDispatch } from "react-redux";

const Register = () => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col justify-center items-center gap-5">
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
        // onClick={}
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
