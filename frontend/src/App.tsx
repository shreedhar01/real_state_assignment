import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ContextProviedr } from "./provider/ContextProvider"
import { Home } from "./pages/Home"
import { Dashboard } from "./pages/Dashboard"
import { Header } from "./components/Header"

export const App = () => {
  return (
    <ContextProviedr>
      <Header/>
      <BrowserRouter>
        <Routes>

          {/* <Route element={<PublicRoute />}> */}
            <Route path="/" element={<Home />} />
          {/* </Route> */}

          {/* <Route element={<ProtectedRoute />}> */}
            <Route path="/dashboard" element={<Dashboard />} />
          {/* </Route> */}

        </Routes>
      </BrowserRouter>
    </ContextProviedr>
  )
}
