// src/App.jsx
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/Layouts/MainLayout";
import Home from "./Pages/Home";
import FetchRQ from "./FetchRQ";
import FetchOld from "./Pages/FetchOld";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import FetchIndv from "./components/Layouts/UI/FetchIndv";
import Sample from "./Sample";

// router can be defined at module scope or inside App
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/trad", element: <FetchOld /> },
      { path: "/rq", element: <FetchRQ /> },
      { path: "/rq/:id", element: <FetchIndv /> }, 
      { path: "/sample", element: <Sample/> }
    ],
  },
]);

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
