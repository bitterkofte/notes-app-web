import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setScreen } from "../Redux/features/Screen";
import { motion } from "framer-motion";

const CardTile = ({ note }) => {
  const [isNote, setIsNote] = useState(false);
  const dispatch = useDispatch();
  const screen = useSelector((state) => state.setScreen.value);

  const openNote = () => {
    setIsNote(!isNote);
    dispatch(setScreen("edit"));
  };

  return (
    <motion.div
      className="p-5 rounded-xl bg-neutral-300 dark:bg-neutral-600 hover:scale-105 hover:drop-shadow-lg transition-all duration-400"
      onClick={openNote}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <h1 className="font-semibold text-lg">{note.title}</h1>
      <p>{note.details}</p>
    </motion.div>
  );
};

export default CardTile;
