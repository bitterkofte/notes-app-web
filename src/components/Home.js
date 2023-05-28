import React, { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
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
import { useSelector } from "react-redux";

const Home = ({ isSignedIn, toggleSignIn }) => {
  const [modal, setModal] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  // const [notes, setNotes] = useState();
  const [loading, setLoading] = useState(true)
  const screen = useSelector((state) => state.setScreen.value)
  const q = query(collUser, where("email", "==", auth.currentUser.email));

  const modalHandler = () => {
    setModal(!modal);
  };

  // useEffect(() => {
  //     const items =  getDoc(
  //       query(collection(db, "users"), orderBy("id", "desc"))
  //     );
  //   console.log("ITEMS: ", items)
  // }, []);

  useEffect(() => {
    // console.log("GİREN: ",auth.currentUser.email);
    const subscriber = onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        setUserInfo({ ...doc.data(), id: doc.id });
      });
      console.log("Credentials: ", userInfo);
      setLoading(false);
    });
    return () => subscriber();
  }, [loading]);

  useEffect(() => {
    console.log("Current Screen: ", screen);
  }, [screen])
  

  function logOutHandler() {
    signOut(auth)
      .then(() => {
        console.log("user signed out");
        toggleSignIn();
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <div className="w-full min-h-screen md:min-h-screen md:mt-0 mt-10 font-LGC p-10 bg-neutral-200 flex flex-col justify-center items-center dark:bg-neutral-800 transition-all duration-500">
      <button
        className="py-2 px-3 mt-6 rounded-xl bg-neutral-700 text-neutral-300 hover:scale-105 hover:bg-purple-600 transition-all duration-500 select-none"
        onClick={modalHandler}
      >
        Add Note
      </button>

      {/* <AnimatePresence>
        {modal && (
          <AddUserModal
            modal={modal}
            toggle={modalHandler}
            setModal={setModal}
          />
        )}
      </AnimatePresence> */}

      <div className="w-full max-w-2xl mt-10 flex flex-wrap gap-5 dark:text-neutral-200 select-none">
        {userInfo.notes?.map((note) => {
          return <CardTile key={note.time} note={note} />;
        })}
      </div>

      <button
        className="fixed bottom-5 right-5 w-32 py-2 px-3 mt-6 rounded-xl bg-red-400 font-bold text-neutral-700 hover:bg-red-700 hover:text-neutral-300 transition-all duration-300 select-none"
        onClick={logOutHandler}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
