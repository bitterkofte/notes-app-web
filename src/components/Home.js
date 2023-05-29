import React, { useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { AiOutlineSearch, AiOutlinePoweroff, AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import AddUserModal from "./AddUserModal";
import { auth, collUser, db } from "../firebase";
import { signOut } from "firebase/auth";
import {
  collection,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import CardTile from "./CardTile";
import { useDispatch, useSelector } from "react-redux";
import { setScreen } from "../Redux/features/Screen";
import Auth from "./Auth";
import AddNote from "./AddNote";

const Home = ({ isSignedIn, toggleSignIn }) => {
  const [modal, setModal] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [search, setSearch] = useState("");
  const [sbActive, setSbActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const screen = useSelector((state) => state.setScreen.value);
  const q = query(collUser, where("email", "==", auth.currentUser.email));

  let inputRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!inputRef.current.contains(e.target)) {
        setSbActive(false);
        // console.log(modal)
        console.log("INPUT: ",inputRef.current);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const modalHandler = () => {
    setModal(!modal);
  };

  useEffect(() => {
    const subscriber = onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        setUserInfo({ ...doc.data(), id: doc.id });
      });
      console.log("Credentials: ", userInfo);
      setLoading(false);
    });
    return () => subscriber();
  }, [loading]);

  function logOutHandler() {
    signOut(auth)
      .then(() => {
        console.log("user signed out");
        dispatch(setScreen("auth"));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <div className="w-full min-h-screen md:min-h-screen md:mt-0 mt-10 p-10 flex flex-col justify-center items-center bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 transition-all duration-500">

      <div className="fixed top-20 pt-5 pb-3 w-full sm:flex-wrap sm:px-6 md:py-10 flex justify-center items-center gap-5 backdrop-blur-lg">

        <div
          className={`w-[500px] flex justify-center items-center border-2 border-neutral-500 rounded-xl bg-transparent ${
            sbActive && "border-purple-600"
          } dark:text-neutral-50 caret-purple-600 transition-all duration-200`}
          onClick={() => setSbActive(true)}
          ref={inputRef}
        >
          <AiOutlineSearch size={25} className="ml-2 text-neutral-500" />
          <input
            className="p-2 w-full border-none outline-none box-border bg-transparent placeholder-neutral-500 caret-purple-600 transition-all duration-500"
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          className="py-2 px-3 rounded-xl bg-neutral-700 text-neutral-300 hover:scale-105 hover:bg-green-600 transition-all duration-500 select-none"
          onClick={modalHandler}
        >
          <AiOutlinePlus size={24}/>
        </button>

        <button
          className="py-2 px-3 rounded-xl bg-neutral-700 text-neutral-300 hover:scale-105 hover:bg-red-600 transition-all duration-500 select-none"
          onClick={modalHandler}
        >
          <AiOutlineDelete size={24}/>
        </button>
      </div>

      <AnimatePresence>
        {modal && (
          <AddNote
            notes={userInfo.notes}
            docId={userInfo.id}
            toggle={modalHandler}
            setModal={setModal}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
      <div className="w-full max-w-2xl mt-10 flex flex-wrap items-stretch content-stretch gap-5 dark:text-neutral-200 select-none">
        {userInfo.notes?.map((note) => {
          return <CardTile key={note.time} note={note} />;
        })}
      </div>
      </AnimatePresence>

      <button
        className="fixed bottom-5 right-5 p-3 mt-6 rounded-xl bg-red-700 font-bold text-red-300 hover:text-neutral-100 transition-all duration-300 select-none"
        onClick={logOutHandler}
      >
        <AiOutlinePoweroff size={32} />
      </button>
    </div>
  );
};

export default Home;
