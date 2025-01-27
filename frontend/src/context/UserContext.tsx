import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'

//@ts-ignore
export const UserDataContext = createContext()

const [user,setUser]=useState({
    email:'',
    fullName:{
        firstName:'',
        lastName:''
    }
})

const UserContext = ({children}:any) => {
  return (
    <div>
        <UserDataContext.Provider value={[user,setUser]}>
            {children}
        </UserDataContext.Provider>
        
    </div>
  )
}

export default UserContext