
import './App.css'
import { createBrowserRouter} from "react-router-dom"
import { mainLayout} from "./components/Layouts/mainLayout"
import Home from './Pages/Home'
import FetchRQ from './FetchRQ'
import FetchOld from './Pages/FetchOld'



function App() {
  const router = createBrowserRouter([
    {
      path : "/", 
      element : <mainLayout/>, 
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
