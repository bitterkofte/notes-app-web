import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setScreen } from "../Redux/features/Screen";
import { AnimatePresence, motion } from "framer-motion";

const CardTile = ({ note, deleting, setToBeDeletedNotes, toBeDeleted }) => {
  const [isNote, setIsNote] = useState(false);
  const [id, setId] = useState("");
  const dispatch = useDispatch();
  const screen = useSelector((state) => state.setScreen.value);

  const openNote = () => {
    if (deleting) {
      setId(note.time);
      setToBeDeletedNotes(note.time);
      console.log("CARDTILE: ", note.time);
    } else {
      //open note
    }
    // setIsNote(!isNote);
    // dispatch(setScreen("edit"));
  };

  let theColor = "";
  switch (note.color) {
    case "gray":
      theColor = "bg-neutral-300 dark:bg-neutral-600";
      break;

    case "red":
      theColor = "bg-red-400 dark:bg-red-800";
      break;
  
    case "yellow":
      theColor = "bg-yellow-400 dark:bg-yellow-600";
      break;
  
    case "blue":
      theColor = "bg-blue-400 dark:bg-blue-800";
      break;
  
    case "green":
      theColor = "bg-green-400 dark:bg-green-800";
      break;
  
    default:
      theColor = "bg-neutral-300 dark:bg-neutral-600";
      break;
  }

  return (
    <motion.div
      // className={`relative z-0 sm:p-3 p-5 overflow-hidden rounded-xl ${note.color ? `bg-${note.color}-100 dark:bg-${note.color}-200` : "bg-neutral-300 dark:bg-neutral-600"} hover:scale-105 hover:drop-shadow-lg transition-all ease-in-out duration-400`}
      className={`relative z-0 sm:p-3 p-5 overflow-hidden rounded-xl ${theColor} hover:scale-105 hover:drop-shadow-lg transition-all ease-in-out duration-400`}
      onClick={openNote}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
        {deleting && (
          <div
            className={`absolute top-0 left-0 w-full h-full ${
              toBeDeleted.includes(note.time) ? "bg-tp-red" : "bg-tp-white"
            } `}
          ></div>
        )}

      {/* <AnimatePresence>
        {deleting && toBeDeleted.includes(note.time) ? 
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            // exit={{ opacity: 0 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="absolute top-0 left-0 w-full h-full bg-tp-red"
          ></motion.div>
          :
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            // exit={{ opacity: 0 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="absolute top-0 left-0 w-full h-full bg-tp-white"
          ></motion.div>
        }
      </AnimatePresence> */}

      <h1 className="sm:text-sm text-2xl font-bold">{note.title}</h1>
      <p className="sm:text-xs">{note.details}</p>
    </motion.div>
  );
};

export default CardTile;
