import React, { useState } from "react"
import { deletePost, fetchPosts } from "./api/Api"
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const FetchRQ = () => {
  const [pageNumber, setPageNumber] = useState(0)
  const queryClient = useQueryClient()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", pageNumber],
    queryFn: () => fetchPosts(pageNumber),
    staleTime: 1000000,
    refetchInterval: false,
    placeholderData: keepPreviousData
  })

  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]) // refresh after deletion
    }
  })

  if (isLoading) return <p style={{ padding: "2rem" }}>Loading posts...</p>
  if (isError)
    return (
      <p style={{ padding: "2rem", color: "red" }}>
        Error fetching posts: {error.message}
      </p>
    )

  return (
    <>
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

                <button
                  onClick={() => deleteMutation.mutate(post.id)}
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? "Deleting..." : "Delete"}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No posts found.</p>
        )}
      </div>

      <button
        onClick={() => setPageNumber((prev) => Math.max(prev - 3, 0))}
        disabled={pageNumber === 0}
      >
        Prev
      </button>

      <h2>{pageNumber}</h2>

      <button onClick={() => setPageNumber((prev) => prev + 3)}>Next</button>
    </>
  )
}

export default FetchRQ
