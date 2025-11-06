
import './App.css'
import { createBrowserRouter} from "react-router-dom"

function App() {
  const router = createBrowserRouter([
    {
      path : "/", 
      element : <MainLayout/>, 
      children : [
        {
          path: "/", 
          element : <Home/>
        },{
          path : "/trad", 
          element : <FetchOld/>
        }, 
        {
          path : "/rq", 
          element : <FetchRQ/>
        }
      ]
    }
  ])


  return (
    <>
     <h1>Tanstack Query</h1>
    </>
  )
}

export default App
