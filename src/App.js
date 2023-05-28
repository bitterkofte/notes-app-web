import "./App.css";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Home from "./components/Home";
import Auth from "./components/Auth";
import { useSelector } from "react-redux";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const screen = useSelector((state) => state.setScreen.value)
  const toggleSignIn = () => {
    setIsSignedIn(!isSignedIn);
  };

  return (
    <div className="w-full min-h-screen md:min-h-screen md:mt-0 mt-10 font-LGC p-10 bg-neutral-200 flex flex-col justify-center items-center dark:bg-neutral-800 transition-all duration-500">
      {/* {isSignedIn == true ? (
        <Home isSignedIn={isSignedIn} toggleSignIn={toggleSignIn} />
      ) : (
        <Auth isSignedIn={isSignedIn} toggleSignIn={toggleSignIn} />
      )} */}
      {screen == true ? (
        <Home isSignedIn={isSignedIn} toggleSignIn={toggleSignIn} />
      ) : (
        <Auth isSignedIn={isSignedIn} toggleSignIn={toggleSignIn} />
      )}
    </div>
  );
}

export default App;
