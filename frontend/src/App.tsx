import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom"
import { ContextProviedr } from "./provider/ContextProvider"
import { Home } from "./pages/Home"
import { Dashboard } from "./pages/Dashboard"
import { Header } from "./components/Header"
import { useAuth } from "./provider/AuthProvider"
import { Spinner } from "./components/ui/spinner"

export const App = () => {
  return (
    <ContextProviedr>
      <BrowserRouter>
        <Header />
        <div className="pt-16">
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </ContextProviedr>
  )
}


const PublicRoute = () => {
  const { data, loading } = useAuth()
  if (loading) return <div className="flex w-full h-screen items-center justify-center ">
    <Spinner className=" size-20 " />
  </div>
  if (data) return <Navigate to="/dashboard" replace />
  return <Outlet />
}


const ProtectedRoute = () => {
  const { data, loading } = useAuth()
  if (loading) return <div className="flex w-full h-screen items-center justify-center ">
    <Spinner className=" size-20 " />
  </div>
  if (!data) return <Navigate to="/" replace />
  return <Outlet />
}
