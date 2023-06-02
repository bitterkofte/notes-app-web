import "./App.css";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import Auth from "./components/Auth";
import { useSelector } from "react-redux";
import EditNote from "./components/EditNote";
import Register from "./components/Register";
import MetaContainer from "./components/MetaContainer";

function App() {
  // const [isSignedIn, setIsSignedIn] = useState(false);
  const screen = useSelector((state) => state.setScreen.value)

  // const toggleSignIn = () => {
  //   setIsSignedIn(!isSignedIn);
  // };

  useEffect(() => {
    console.log("ANA: ", screen)
  }, [screen])

  const navigateSwitch = (screen) => {
    switch (screen) {
      case "auth":
        return <Auth />
        break;
      
      case "register":
        return <Register />
        break;
      
        case "home":
        return <Home />
        break;

        case "edit":
        return <EditNote />
        break;
    
      default:
        return <Auth />
        break;
  }}
  

  return (
    <div className="w-full min-h-screen md:min-h-screen md:mt-0 mt-10 font-LGC p-10 bg-neutral-200 flex flex-col justify-center items-center dark:bg-neutral-800 transition-all duration-500">
      <MetaContainer/>
      {/* {isSignedIn == true ? (
        <Home isSignedIn={isSignedIn} toggleSignIn={toggleSignIn} />
      ) : (
        <Auth isSignedIn={isSignedIn} toggleSignIn={toggleSignIn} />
      )} */}
      {navigateSwitch(screen)}
    </div>
  );
}

export default App;
