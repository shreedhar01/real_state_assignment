import { CreateAccount } from "../components/CreateAccount"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { SignIn } from "../components/SignIn"

export const Home = () => {
    return (
        <div className="flex items-center justify-center">
            <main className="flex items-center justify-center w-full md:max-w-7xl pt-8 px-2">
                <Tabs defaultValue="create_account">
                    <TabsList className="w-[480px]">
                        <TabsTrigger value="create_account">Create Account</TabsTrigger>
                        <TabsTrigger value="sign_in">Sign In</TabsTrigger>
                    </TabsList>
                    <TabsContent className="w-full" value="create_account">
                        <CreateAccount/>
                    </TabsContent>
                    <TabsContent value="sign_in">
                        <SignIn/>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}