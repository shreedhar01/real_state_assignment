import { ModeToggle } from "./mode-toggle"

export const Header = () => {
    return (
        <div className="flex items-center justify-center">
            <nav className="flex items-center justify-between py-4 px-2 w-full md:max-w-7xl border-b">
                <p className="text-xl font-bold">Dream Land</p>
                <ModeToggle />
            </nav>
        </div>
    )
}