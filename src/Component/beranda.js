import React, { Component } from 'react'
import {motion} from 'framer-motion'

export default class Beranda extends Component {
  render() {
    const nama = "Rivaldo"

    const efek = {
      hidden: {opacity: 0},
      visible: {
        opacity: 1,
        transition: {
          delay: 0.2, // delay before efek mulai
          staggerChildren: 0.8 // jeda antar huruf
        }
    }
  }
  const huruf = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 1 // animasi per huruf
      }
    }
  }
    return (
      <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      transition={{duration: 0.9}}
      >
      <div>
        <div>

        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 1}}
          >
        <motion.h2
           variants={efek}
           initial="hidden"
           animate="visible"
        >
          {nama.split("").map((letter, index) => (
                <motion.span key={index} variants={huruf}>
                  {letter}
                </motion.span>
              ))}
        </motion.h2>
        </motion.div>
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 2}}
          >
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </motion.div>
        </div>
        
      </div>
        </motion.div>
    )
  }
}
