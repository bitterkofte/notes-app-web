import React, { useEffect, useRef, useState } from "react";
import { addUser } from "../Redux/features/Users";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import CoolAlert from "./CoolAlert";

const AddNote = ({ toggle, notes, docId, setModal }) => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [userNotes, setUserNotes] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [color, setColor] = useState("gray");
  const dispatch = useDispatch();
  let modalRef = useRef();
  // const userList = useSelector((state) => state.users.value);
  const docRef = doc(db, "users", docId);

  useEffect(() => {
    let handler = (e) => {
      if (!modalRef.current.contains(e.target)) {
        setModal(false);
        // console.log(modal)
        // console.log(modalRef.current);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const addUserHandler = () => {
    console.log(title, "-", details);
    if (title | (details === "")) {
      setError("Both title and details sections must have a valid value");
      setTimeout(() => {
        setError("");
      }, "4000");
    } else {
      notes.push({
        title: title,
        details: details,
        time: Date.now(),
        color: color,
      });
      console.log(notes);
      setUserNotes(notes);
      setSuccess("Note has been added successfully");
      setTimeout(() => {
        setSuccess("");
        setModal(false);
      }, "1500");
    }
  };

  useEffect(() => {
    updateDoc(docRef, {
      notes,
    }).then(() => {
      console.log("UPDATED");
    });
  }, [userNotes]);

  return (
    <motion.div
      className="fixed z-20 top-0 left-0 w-screen h-screen flex justify-center items-center bg-neutral-800 bg-opacity-75"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <CoolAlert success={success} error={error} />
      <motion.div
        className={`${
          error &&
          "border-red-600 hover:border-red-600 transition-all duration-1000"
        } absolute w-auto flex flex-col justify-center items-center gap-3 p-12 rounded-xl bg-neutral-200 dark:bg-neutral-800 border-2 border-neutral-600 hover:border-purple-600 transition-all duration-700`}
        ref={modalRef}
        initial={{ y: -2000 }}
        animate={{ y: 0 }}
        exit={{ y: -3000 }}
        transition={{ duration: 0.1 }}
      >
        <button
          className="absolute top-3 right-3 p-1 bg-neutral-500 hover:bg-red-500 rounded-lg transition-all duration-300"
          onClick={toggle}
        >
          <IoMdClose size={17} className="text-neutral-800 " />
        </button>

        <h1 className="dark:text-neutral-200 mb-6 font-bold text-3xl">
          Add New Note
        </h1>
        <input
          className="p-2 w-full border-2 border-neutral-400 rounded-xl bg-transparent placeholder-neutral-500 focus:outline-none focus:border-purple-600 dark:text-neutral-50 caret-purple-600 transition-all duration-500"
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        ></input>

        <textarea
          className="p-2 w-full border-2 border-neutral-400 rounded-xl bg-transparent placeholder-neutral-500 focus:outline-none focus:border-purple-600 dark:text-neutral-50 caret-purple-600 transition-all duration-500"
          type="text"
          placeholder="Details"
          maxLength={200}
          rows={4}
          onChange={(e) => setDetails(e.target.value)}
        ></textarea>

        <div className="p-2 px-3 w-full flex justify-between items-center bg-neutral-300 dark:bg-neutral-700 border-2 border-neutral-400 rounded-xl">
          <div
            className={`p-3 bg-neutral-300 dark:bg-neutral-600 rounded-full border-2 cursor-pointer hover:scale-110 transition-all duration-200 ${
              color === "gray"
                ? "border-neutral-600 dark:border-neutral-300"
                : "border-neutral-400 dark:border-neutral-500"
            }`}
            onClick={() => setColor("gray")}
          ></div>
          <div
            className={`p-3 bg-red-400 dark:bg-red-800 rounded-full border-2 cursor-pointer hover:scale-110 transition-all duration-200 ${
              color === "red"
                ? "border-neutral-600 dark:border-neutral-300"
                : "border-neutral-400 dark:border-neutral-500"
            }`}
            onClick={() => setColor("red")}
          ></div>
          <div
            className={`p-3 bg-yellow-400 dark:bg-yellow-600 rounded-full border-2 cursor-pointer hover:scale-110 transition-all duration-200 ${
              color === "yellow"
                ? "border-neutral-600 dark:border-neutral-300"
                : "border-neutral-400 dark:border-neutral-500"
            }`}
            onClick={() => setColor("yellow")}
          ></div>
          <div
            className={`p-3 bg-blue-400 dark:bg-blue-800 rounded-full border-2 cursor-pointer hover:scale-110 transition-all duration-200 ${
              color === "blue"
                ? "border-neutral-600 dark:border-neutral-300"
                : "border-neutral-400 dark:border-neutral-500"
            }`}
            onClick={() => setColor("blue")}
          ></div>
          <div
            className={`p-3 bg-green-400 dark:bg-green-800 rounded-full border-2 cursor-pointer hover:scale-110 transition-all duration-200 ${
              color === "green"
                ? "border-neutral-600 dark:border-neutral-300"
                : "border-neutral-400 dark:border-neutral-500"
            }`}
            onClick={() => setColor("green")}
          ></div>
        </div>

        <button
          className="py-2 px-3 mt-6 rounded-xl bg-neutral-700 text-neutral-300 active:scale-110 hover:bg-purple-600 transition-all duration-200 select-none"
          onClick={addUserHandler}
        >
          Add Note
        </button>
      </motion.div>
    </motion.div>
  );
};

export default AddNote;
