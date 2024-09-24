import { createContext, useEffect, useState } from "react";

const postContext = createContext(null)


function Post ({children}) {

const [postDetails, setPostDetails] = useState(() => {
    const storedDetails = localStorage.getItem('postDetails');
    return storedDetails ? JSON.parse(storedDetails) : null
})

useEffect(() => {
    if(postDetails){
        localStorage.setItem('postDetails', JSON.stringify(postDetails))
    }
}, [postDetails])

    return (
        <postContext.Provider value={{postDetails, setPostDetails}}>
            {children}
        </postContext.Provider>
    )
}

export {
    Post,
    postContext
}