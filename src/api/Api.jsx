import React from 'react'
import axios from "axios"

const api = axios.create({
    baseURL : "https://jsonplaceholder.typicode.com"

})

export const fetchPosts = ()=>{
    return api.get("/posts")
     
}
const Api = () => {
  return (
    <div>
      
    </div>
  )
}

export default Api
