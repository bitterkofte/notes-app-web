import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

const Auth = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [setRegister, setRegisterScreen] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loginHandler = () => {
    console.log(mail, "-", password);
    if (mail | (password === "")) {
      setError("Both mail and password must have a valid value!");
      setTimeout(() => {
        setError("");
      }, "4000");
    } else {
      // dispatch(
      //   addUser({
      //     id: userList[userList.length - 1].id + 1,
      //     name,
      //     username,
      //   })
      // );
      setSuccess("Logged in!");
      setTimeout(() => {
        setSuccess("");
      }, "1500");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <AnimatePresence>
          {error && (
            <motion.div
              className="fixed top-0 p-3 bg-red-900 text-neutral-200 rounded-xl text-center transition-all duration-500 select-none"
              initial={{ y: -60 }}
              animate={{ y: 20 }}
              exit={{ y: -3000 }}
              transition={{ duration: 0.1 }}
            >
              {error}
            </motion.div>
          )}
          {success && (
            <motion.div
              className="fixed top-0 p-3 bg-green-800 text-neutral-200 rounded-xl text-center transition-all duration-500 select-none"
              initial={{ y: -60 }}
              animate={{ y: 20 }}
              exit={{ y: -3000 }}
              transition={{ duration: 0.1 }}
            >
              {success}
            </motion.div>
          )}
        </AnimatePresence>

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
        onClick={loginHandler}
      >
        Login
      </button>
      <button
        className="fixed bottom-5 right-5 w-32 py-2 px-3 mt-6 rounded-xl bg-gradient-to-tr from-indigo-700 to-violet-700 text-neutral-300 hover:scale-110 transition-all duration-300 select-none"
        onClick={() => setRegisterScreen(true)}
      >
        Register
      </button>
    </div>
  );
};

export default Auth;
