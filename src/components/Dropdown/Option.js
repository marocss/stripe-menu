import React, { useRef, useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion'


import { useDimensions } from './dimensions'
import { Context } from './Provider'

let lastOptionId = 0

export function DropdownOption({ name, content: Content, backgroundHeight }) {
  const idRef = useRef(++lastOptionId)
  const id = idRef.current

  const [registered, setRegistered] = useState(false)

  const [optionHook, optionDimensions] = useDimensions()

  const { 
    registerOption,
    updateOptionProps,
    deleteOptionById,
    setTargetId,
    targetId
  } = useContext(Context)

  useEffect(() => {
    if(!registered && optionDimensions) {
      const WrappedContent = () => {
        const contentRef = useRef()

        useEffect(() => {
          const contentDimensions = contentRef.current.getBoundingClientRect()

          updateOptionProps(id, { contentDimensions })
        }, [])

        return (
          <div ref={contentRef}>
            <Content />
          </div>
        )
      }

      registerOption({
        id,
        optionDimensions,
        optionCenterX: optionDimensions.x + optionDimensions.width / 2,
        WrappedContent,
        backgroundHeight
      })
      
      setRegistered(true)
    } else if (registered && optionDimensions) {
      updateOptionProps(id, {
        optionDimensions,
        optionCenterX: optionDimensions.x + optionDimensions.width / 2,
      })
    }

  }, [backgroundHeight, id, optionDimensions, registerOption, registered, updateOptionProps])
  
  useEffect(() => 
    deleteOptionById(id)
  , [deleteOptionById, id])
  

  const handleClick = (e) => {
    e.preventDefault()

    return targetId === id ? handleClose() : handleOpen()
  }

  const handleOpen = () => {
    setTargetId(id)
  }
  
  const handleClose = () => {
    setTargetId(null)
  }

  const handleTouch = () => {
    window.isMobile = true
  }

  return (
    <motion.button 
      className="dropdown-option"
      ref={optionHook}
      onMouseDown={handleClick}
      onHoverStart={() => !window.isMobile && handleOpen()}
      onHoverEnd={() => !window.isMobile && handleClose()}
      onTouchStart={handleTouch}
      onFocus={handleOpen}
      onBlur={handleClose}
    >
      {name}
    </motion.button>
  )
}
