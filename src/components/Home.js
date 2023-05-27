import React from 'react'
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import AddUserModal from './AddUserModal';

const Home = () => {
  const [modal, setModal] = useState(false);

  const modalHandler = () => {
    setModal(!modal);
  };
  return (
    <div className="w-full min-h-screen md:min-h-screen md:mt-0 mt-10 font-LGC p-10 bg-neutral-200 flex flex-col justify-center items-center dark:bg-neutral-800 transition-all duration-500">
      <button
        className="py-2 px-3 mt-6 rounded-xl bg-neutral-700 text-neutral-300 hover:scale-105 hover:bg-purple-600 transition-all duration-500 select-none"
        onClick={modalHandler}
      >
        Add Note
      </button>

      <AnimatePresence>
        {modal && (
          <AddUserModal
            modal={modal}
            toggle={modalHandler}
            setModal={setModal}
          />
        )}
      </AnimatePresence>

      <div className="w-full max-w-2xl mt-10 flex flex-wrap gap-5 dark:text-neutral-200 select-none">
        {/* {users.map((user) => {
          return <CardTile key={user.id} user={user} />;
        })} */}
      </div>
    </div>
  )
}

export default Home