import React, { useEffect, useState } from 'react'
import { fetchPosts } from '../api/Api'

const FetchOld = () => {
  const [posts, setPosts] = useState([])

  const getPostData = async () => {
    try {
      const res = await fetchPosts()
      if (res.status === 200) {
        setPosts(res.data)
      }
    } catch (error) {
      console.error("Error fetching posts:", error)
    }
  }

  useEffect(() => {
    getPostData()
  }, [])

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ marginBottom: "1rem" }}>Fetched Posts (Traditional Axios)</h2>

      {posts.length > 0 ? (
        <div style={{ display: "grid", gap: "1rem" }}>
          {posts.map((post) => (
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
        <p>Loading posts...</p>
      )}
    </div>
  )
}

export default FetchOld
