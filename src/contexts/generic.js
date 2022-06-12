import React from 'react'

export const GenericContext = React.createContext({});

export default function GenericProvider({ children }) {

  const [movie, setMovie] = React.useState(null);  
  const [column, setColumn] = React.useState(null);

  return (
    <GenericContext.Provider value={{ 
      setMovie,
      setColumn,
      movie,
      column,
    }}>
      {children}
    </GenericContext.Provider>
  )
}