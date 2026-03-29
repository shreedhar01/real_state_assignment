import { AllProperties } from "../components/AllProperties"
// import { FavouriteProperties } from "../components/FavouriteProperties"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"

export const Dashboard = () => {
    return (
        <div className="flex-1 min-h-0 flex items-center justify-center">
            <main className="flex-1 min-h-1 flex  w-full md:max-w-7xl pt-4 px-2">
                <Tabs defaultValue="all_properties">
                    <TabsList className="">
                        <TabsTrigger value="all_properties">All Properties</TabsTrigger>
                        {/* <TabsTrigger value="favourite_properties">Favourite Properties</TabsTrigger> */}
                    </TabsList>
                    <TabsContent className="w-full" value="all_properties">
                        <AllProperties/>
                    </TabsContent>
                    {/* <TabsContent value="favourite_properties">
                        <FavouriteProperties/>
                    </TabsContent> */}
                </Tabs>
            </main>
        </div>
    )
}