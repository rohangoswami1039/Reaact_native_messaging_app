import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import React, { useContext } from 'react'
import { useState } from 'react'
import { auth, storage } from '../../config/firebase'

const Chat_function = React.createContext()

export function useChat_function(){
    return useContext(Chat_function)
}

export function Chat_function_provider({children}){
    const [loading,set_loading]=useState()

    async function Upload_images(uid,image){
        const docId = uid >auth.currentUser.uid ? auth.currentUser.uid + '-'+ uid : uid +'-'+ auth.currentUser.uid
        const task = ref(storage,`chatrooms/${docId}/${Math.random().toString(36)}`)
        const img = await fetch(image)
        const bytes = await img.blob()

        await uploadBytes(task,bytes)
        .then(async (snapshot)=>{
            await getDownloadURL(task)
            .then((downloadURL)=>{
                return (downloadURL.toString)
            })
            .catch((e)=>{
                console.log(e)
            })
        })
        .catch((E)=>{
            console.log(E.message)
        })

    }



    const value = {
        Upload_images,
        loading,
    }
    return (
        <Chat_function.Provider value={value}>
            {children}
        </Chat_function.Provider>
    )
}