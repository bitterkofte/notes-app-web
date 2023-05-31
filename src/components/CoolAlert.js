import React from 'react'
import { motion } from 'framer-motion'

const CoolAlert = ({error, success}) => {
  return (
    <>
      {error && (
          <motion.div
            className="fixed z-20 top-0 p-3 bg-red-900 text-neutral-200 rounded-xl text-center transition-all duration-500 select-none"
            initial={{ y: -60 }}
            animate={{ y: 20 }}
            exit={{ y: -3000 }}
            transition={{ duration: 0.1 }}
          >
            {error}
          </motion.div>
        )}
        {success && (
          <motion.div
            className="fixed z-20 top-0 p-3 bg-green-800 text-neutral-200 rounded-xl text-center transition-all duration-500 select-none"
            initial={{ y: -60 }}
            animate={{ y: 20 }}
            exit={{ y: -3000 }}
            transition={{ duration: 0.1 }}
          >
            {success}
          </motion.div>
        )}
    </>
  )
}

export default CoolAlert