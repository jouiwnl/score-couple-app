import React from 'react'

export const MediaContext = React.createContext({});

export default function MediaProvider({ children }) {

  const [mediaType, setMediaType] = React.useState('Movies');

  return (
    <MediaContext.Provider value={{
      mediaType,
      setMediaType
    }}>
      {children}
    </MediaContext.Provider>
  )
}