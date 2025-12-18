import { useContext, useEffect } from "react"
import { useState } from "react"
import GlobalContext from "../contexts/GlobalContext"
const UserDetails=()=>{
    const[userData,setUserData]=useState({})
    const {currentPage}=useContext(GlobalContext)
    const[Loading,setLoading]=useState(true)
    useEffect(()=>{
        const fetchData=async ()=>{
            const response=await fetch(`https://jsonplaceholder.typicode.com/users/${currentPage}`)
            const data=await response.json()
            setLoading(false);
            console.log(data)
            setUserData(data)
        }
        fetchData()
    },[currentPage])
    return(
        <div className="w-[300px] mx-auto bg-orange-200 flex flex-col rounded-md shadow-lg items-center p-5">
            <h1 className="text-xl mb-2 font-bold">User Details</h1>
            {Loading? (
                <p className="text-xl mb-2">Loading...</p>
            ):(
                <p>{userData.name}</p>
                // <p>{userData.username}</p>
                // <p>{userData.email}</p>
                // <p>{userData.phone}</p>
            )}
        </div>
    )
}
export default UserDetails