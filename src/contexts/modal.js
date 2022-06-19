import React from 'react'

export const ModalContext = React.createContext({});

export default function ModalProvider({ children }) {

  const mediaRef = React.useRef(null);
  const columnRef = React.useRef(null);
  const mediaToAddRef = React.useRef(null);

  function openModal(ref) {
    ref.current?.open();
  }

  function closeModal(ref) {
    ref.current?.close();
  }

  return (
    <ModalContext.Provider value={{ 
      openModal, 
      closeModal ,
      mediaRef,
      columnRef,
      mediaToAddRef
    }}>
      {children}
    </ModalContext.Provider>
  )
}