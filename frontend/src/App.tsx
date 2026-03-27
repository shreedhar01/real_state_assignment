import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ContextProviedr } from "./provider/ContextProvider"
import { Home } from "./pages/Home"
import { Dashboard } from "./pages/Dashboard"

export const App = () => {
  return (
    <ContextProviedr>
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
