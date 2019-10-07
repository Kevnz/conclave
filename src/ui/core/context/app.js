import React, { createContext, useEffect } from 'react'

const initialState = {
  tags: [
    { label: 'Dashboard' },
    { label: 'JavaScript' },
    { label: 'HTML' },
    { label: 'CSS' },
  ],
  recent: [],
}

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  useEffect(() => {}, [])

  return (
    <AppContext.Provider value={initialState}>{children}</AppContext.Provider>
  )
}
