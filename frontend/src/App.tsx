import { ModeToggle } from "./components/mode-toggle"
import { Button } from "./components/ui/button"
import { ContextProviedr } from "./provider/ContextProvider"

function App() {
  return (
    <ContextProviedr>
      <div className='flex flex-col items-center justify-center w-full min-h-screen'>
        <p className="bg-black text-white p-4 rounded-xl">Hello world</p>
        <Button>Click me</Button>
        <ModeToggle/>
      </div>
    </ContextProviedr>
  )
}

export default App
