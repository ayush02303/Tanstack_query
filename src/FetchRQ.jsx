import React from "react"
import { fetchPosts } from "./api/Api"
import { useQuery } from "@tanstack/react-query"

const FetchRQ = () => {
  const getPostData = async () => {
    try {
      const res = await fetchPosts()
      if (res.status === 200) {
        return res.data
      }
    } catch (error) {
      console.error("Error fetching posts:", error)
      throw error
    }
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getPostData,
    staleTime: 1000000, 
    refetchInterval:1000
  })

  if (isLoading) return <p style={{ padding: "2rem" }}>Loading posts...</p>
  if (isError)
    return (
      <p style={{ padding: "2rem", color: "red" }}>
        Error fetching posts: {error.message}
      </p>
    )

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ marginBottom: "1rem" }}>Fetched Posts (React Query)</h2>

      {data && data.length > 0 ? (
        <div style={{ display: "grid", gap: "1rem" }}>
          {data.map((post) => (
            <div
              key={post.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "1rem",
                backgroundColor: "#f9f9f9",
              }}
            >
              <h3 style={{ color: "#333", marginBottom: "0.5rem" }}>
                {post.title}
              </h3>
              <p style={{ color: "#555" }}>{post.body}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  )
}

export default FetchRQ
