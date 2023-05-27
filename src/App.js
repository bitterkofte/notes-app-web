import "./App.css";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Home from "./components/Home";
import Auth from "./components/Auth";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const toggleSignIn = () => {
    setIsSignedIn(!isSignedIn);
  };

  return (
    <div className="w-full min-h-screen md:min-h-screen md:mt-0 mt-10 font-LGC p-10 bg-neutral-200 flex flex-col justify-center items-center dark:bg-neutral-800 transition-all duration-500">
      {isSignedIn == true ? <Home /> : <Auth />}
    </div>
  );
}

export default App;
