import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Header from "./Components/Header"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import Register from "./pages/register"
import { Toaster } from "react-hot-toast"
import { useContext, useEffect } from "react"
import axios from "axios"
import { Context, server } from "./main"
import PrivateRoute from "./Components/PrivateRoutes"
import Footer from "./Components/Footer"

function App() {
        
  const { setUser, setIsAuthenticated, setLoading,isAuthenticated,user} = useContext(Context)

  useEffect(() => {

    setLoading(true)

    axios.get(`${server}/users/me`, {
      withCredentials: true,
    }).then(res => {
      setUser(res.data.user)
      setIsAuthenticated(true)
      setLoading(false)
    }).catch((error) => {
      setUser({})
      setIsAuthenticated(false)
      setLoading(false)
    })


  }, [isAuthenticated])
  
  

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Toaster />
      <Footer/>
    </Router>
  )
}

export default App
