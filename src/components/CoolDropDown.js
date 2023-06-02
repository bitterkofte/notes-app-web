import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

const CoolDropDown = ({ sortBy, sortHandler }) => {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const [option, setOption] = useState("Sort By")
  let x = 0;

  if (isDropDownVisible) {
    x = 180;
  }

  const dropDownHandler = () => {
    setIsDropDownVisible(!isDropDownVisible);
  };

  useEffect(() => {
    switch (sortBy) {
      case "titleAsc":
        setOption(<div className='flex items-center gap-1'>Title <BsArrowUp /></div>);
        break;

      case "titleDes":
        setOption(<div className='flex items-center gap-1'>Title <BsArrowDown /></div>);
        break;

      case "timeAsc":
        setOption(<div className='flex items-center gap-1'>Time <BsArrowUp /></div>);
        break;

      case "timeDes":
        setOption(<div className='flex items-center gap-1'>Time <BsArrowDown /></div>);
        break;

      default:
        setOption("Sort by");
        break;
    }
  }, [sortBy])
  

  return (
    <div className="relative w-32 bg-neutral-700 shadow-md rounded-xl cursor-pointer select-none">
      <div
        className="p-3 flex justify-between items-center gap-2 text-neutral-400 dark:text-neutral-400 rounded-xl"
        onClick={dropDownHandler}
      >
        <div className="">{option}</div>
        <motion.div animate={{ rotate: x }}>
          <IoIosArrowDown className="mt-1" />
        </motion.div>
      </div>

      <AnimatePresence>
        {isDropDownVisible && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="absolute top-4 left-0 pt-3 w-32 rounded-b-xl bg-neutral-700 text-neutral-300 overflow-hidden"
          >
            <div
              className="p-3  flex justify-between items-center hover:bg-neutral-600 transition-all duration-200"
              onClick={() => sortHandler("titleAsc")}
            >
              Title <BsArrowUp />
            </div>
            <div
              className="p-3  flex justify-between items-center hover:bg-neutral-600 transition-all duration-200"
              onClick={() => sortHandler("titleDes")}
            >
              Title <BsArrowDown />
            </div>
            <div
              className="p-3  flex justify-between items-center hover:bg-neutral-600 transition-all duration-200"
              onClick={() => sortHandler("timeAsc")}
            >
              Time <BsArrowUp />
            </div>
            <div
              className="p-3  flex justify-between items-center hover:bg-neutral-600 transition-all duration-200"
              onClick={() => sortHandler("timeDes")}
            >
              Time <BsArrowDown />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CoolDropDown;
