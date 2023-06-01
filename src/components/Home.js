import React, { useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import {
  AiOutlineSearch,
  AiOutlinePoweroff,
  AiOutlineDelete,
  AiOutlinePlus,
} from "react-icons/ai";
import { HiArrowUturnLeft } from "react-icons/hi2";
import { useState } from "react";
import AddUserModal from "./AddUserModal";
import { auth, collUser, db } from "../firebase";
import { signOut } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import CardTile from "./CardTile";
import { useDispatch, useSelector } from "react-redux";
import { setScreen } from "../Redux/features/Screen";
import Auth from "./Auth";
import AddNote from "./AddNote";
import CoolAlert from "./CoolAlert";

const Home = ({ isSignedIn, toggleSignIn }) => {
  const [modal, setModal] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState([]);
  const [search, setSearch] = useState("");
  const [sbActive, setSbActive] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [toBeDeleted, setToBeDeleted] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const screen = useSelector((state) => state.setScreen.value);
  const q = query(collUser, where("email", "==", auth.currentUser.email));

  let inputRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (sbActive & !inputRef.current.contains(e.target)) {
        setSbActive(false);
        // console.log(modal)
        console.log("INPUT: ", inputRef.current);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [sbActive]);

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

  const deleteHandler = () => {
    if (deleting) {
      if (toBeDeleted.length == 0) {
        setError("You must first choose the notes that you want to delete!");
        setTimeout(() => {
          setError("");
        }, "4000");
      } else {
        const filteredNotes = userInfo.notes?.filter(
          (item) => !toBeDeleted.includes(item.time)
        );
        console.log("Yeni array: ", filteredNotes);
        const docRef = doc(db, "users", userInfo.id);
        updateDoc(docRef, {
          notes: filteredNotes,
        }).then(() => {
          setLoading(true);
          setSuccess("Selected notes have been deleted!");
          setDeleting(false);
          setTimeout(() => {
            setSuccess("");
            setToBeDeleted([]);
          }, "3000");
        });
      }
    } else {
      setDeleting(true);
    }
  };

  const setToBeDeletedNotes = (nts) => {
    setToBeDeleted((prev) => [...prev, nts]);
  };

  useEffect(() => {
    console.log("Silinecekler: ", toBeDeleted);
  }, [toBeDeleted]);

  return (
    <div className="w-full min-h-screen flex justify-center sm:mt-28 md:mt-24 sm:p-0 p-0 bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 transition-all duration-500">
      <CoolAlert success={success} error={error} />
      <div className="fixed z-[8] z top-20 left-0 pt-5 pb-3 w-full sm:flex-col sm:px-0 md:py-10 flex justify-center items-center content-center gap-5 backdrop-blur-lg transition-all duration-500 ease-in-out">
        <div
          className={`sm:min-w-[300px] md:min-w-[500px] md:max-w-[900px] lg:min-w-[800px] flex justify-center items-center border-2 border-neutral-500 rounded-xl bg-transparent ${
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

        <div className='flex justify-center items-center gap-5'>
        <button
          className="sm:px-8 py-2 px-3 rounded-xl bg-neutral-700 text-neutral-300 hover:scale-105 hover:bg-green-600 transition-all duration-500 select-none"
          onClick={modalHandler}
        >
          <AiOutlinePlus size={24} />
        </button>

        <button
          // ! DELETE
          className="sm:px-8 py-2 px-3 rounded-xl bg-neutral-700 text-neutral-300 hover:scale-105 hover:bg-red-600 transition-all duration-500 select-none"
          onClick={deleteHandler}
        >
          <AiOutlineDelete size={24} />
        </button>

        <button
          className={`${
            deleting ? "block" : "hidden"
          } sm:px-7 py-2 px-3 rounded-xl bg-neutral-700 text-neutral-300 hover:scale-105 hover:bg-cyan-700 transition-all duration-500 ease-in-out select-none`}
          onClick={() => {
            setToBeDeleted([]);
            setDeleting(false);
          }}
        >
          <HiArrowUturnLeft size={24} />
        </button>
        </div>
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
        <div className="w-full max-w-5xl sm:mt-10 mt-20 flex justify-start content-start flex-wrap gap-5 dark:text-neutral-200 select-none">
          {userInfo.notes?.length === 0 ? (
            <div className="w-full text-center dark:text-neutral-400">
              Let's start with adding a note with the plus button next to the
              search bar.
            </div>
          ) : (
            userInfo.notes
              ?.filter((note) => {
                return search.toLowerCase() === '' ? note : note.title.toLowerCase().includes(search);
              })
              .map((note) => {
                return (
                  <CardTile
                    key={note.time}
                    note={note}
                    deleting={deleting}
                    setToBeDeletedNotes={setToBeDeletedNotes}
                    toBeDeleted={toBeDeleted}
                  />
                );
              })
          )}
        </div>
      </AnimatePresence>

      <button
        className="fixed bottom-5 right-5 p-3 mt-6 rounded-xl bg-neutral-700 font-bold text-neutral-100 hover:bg-red-700 transition-all duration-700 ease-in-out select-none"
        onClick={logOutHandler}
      >
        <AiOutlinePoweroff size={32} />
      </button>
    </div>
  );
};

export default Home;
