import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setScreen } from "../Redux/features/Screen";
import { motion } from "framer-motion";

const CardTile = ({ note, deleting, setToBeDeletedNotes, toBeDeleted }) => {
  const [isNote, setIsNote] = useState(false);
  const [ id, setId] = useState("");
  const dispatch = useDispatch();
  const screen = useSelector((state) => state.setScreen.value);

  const openNote = () => {
    if(deleting){
      setId(note.time);
      setToBeDeletedNotes(note.time);
      console.log("CARDTILE: ",note.time);
    } else {
      //open note
    }
    // setIsNote(!isNote);
    // dispatch(setScreen("edit"));
  };

  return (
    <motion.div
      className="relative z-0 p-5 overflow-hidden rounded-xl bg-neutral-300 dark:bg-neutral-600 hover:scale-105 hover:drop-shadow-lg transition-all duration-400"
      onClick={openNote}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      {deleting && <div className={`absolute top-0 left-0 w-full h-full ${toBeDeleted.includes(note.time) ? "bg-tp-red" : "bg-tp-white"} `}></div>}
      <h1 className="font-semibold text-lg">{note.title}</h1>
      <p>{note.details}</p>
    </motion.div>
  );
};

export default CardTile;
