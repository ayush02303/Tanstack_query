// Sample.jsx
import React from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchPosts = async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts")
  return res.data
}

const Sample = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  })

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error: {error.message}</p>

  return (
    <div>
      {data.map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  )
}

export default Sample
