import { LogOutIcon } from "lucide-react"
import { useLogOut } from "../lib/api/hooks/auth"
import { useAuth } from "../provider/AuthProvider"
import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export const Header = () => {
    const { data } = useAuth()
    const logOutMutation = useLogOut()
    const navigate = useNavigate()

    const handleLogOut = async () => {
        try {
            await toast.promise(
                logOutMutation.mutateAsync(),
                {
                    loading: "Logging out...",
                    success: <b>Logout success!</b>,
                    error: <b>Logout fail!</b>
                }
            )
            navigate("/", { replace: true })
        } catch (error) {
        }
    }
    return (
        <div className="flex items-center justify-center">
            <nav className="flex items-center justify-between py-4 px-2 w-full md:max-w-7xl border-b">
                <p className="text-xl font-bold">Dream Land</p>
                <div className={`${data ? "flex gap-2" : ""}`}>
                    <ModeToggle />
                    {
                        data ?
                            <Button
                                onClick={handleLogOut}
                            >
                                <LogOutIcon />
                            </Button> : ""
                    }
                </div>
            </nav>
        </div>
    )
}