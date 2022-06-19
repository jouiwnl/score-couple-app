import React from 'react'

export const GenericContext = React.createContext({});

export default function GenericProvider({ children }) {

  const [media, setMedia] = React.useState({});  
  const [column, setColumn] = React.useState(null);

  return (
    <GenericContext.Provider value={{ 
      setMedia,
      setColumn,
      media,
      column,
    }}>
      {children}
    </GenericContext.Provider>
  )
}