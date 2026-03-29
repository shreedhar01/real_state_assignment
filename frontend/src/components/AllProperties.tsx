import { EllipsisIcon, HeartIcon } from "lucide-react"
import { useIsMobile } from "../utils/deviceWidth"
import { Button } from "./ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "./ui/dropdown-menu"
import { useGetAllProperties } from "../lib/api/hooks/properties"
import { useEffect, useRef } from "react"

export const AllProperties = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const contentBorder = useRef<HTMLDivElement>(null)
    const isMobile = useIsMobile()

    const {
        data: propData,
        fetchNextPage: propFetchNextPage,
        hasNextPage: propHasNextPage,
        isFetchingNextPage: propIsFetchingNextPage,
    } = useGetAllProperties()

    const isFetchingRef = useRef(false)
    const scrollHeightBeforeFetch = useRef<number | null>(null)
    const scrollTopBeforeFetch = useRef<number | null>(null)

    useEffect(() => {
        const container = scrollContainerRef.current
        if (!container) return

        const observer = new IntersectionObserver((entries) => {
            if (
                entries[0].isIntersecting &&
                propHasNextPage &&
                !propIsFetchingNextPage &&
                !isFetchingRef.current
            ) {
                scrollHeightBeforeFetch.current = container.scrollHeight
                scrollTopBeforeFetch.current = container.scrollTop
                isFetchingRef.current = true

                propFetchNextPage().then(() => {
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            const newScrollHeight = container.scrollHeight
                            const addedHeight = newScrollHeight - (scrollHeightBeforeFetch.current ?? newScrollHeight)
                            container.scrollTop = (scrollTopBeforeFetch.current ?? 0) + addedHeight
                            scrollHeightBeforeFetch.current = null
                            scrollTopBeforeFetch.current = null
                            // setTimeout(() => {
                                isFetchingRef.current = false
                            // }, 300)
                        })
                    })
                })
            }
        }, { threshold: 0.1 })

        if (contentBorder.current) observer.observe(contentBorder.current)
        return () => observer.disconnect()
    }, [propHasNextPage, propFetchNextPage, propIsFetchingNextPage])

    const allProperties = propData?.pages.flatMap(page => page.data) ?? []

    return (
        <div
            ref={scrollContainerRef}
            className="flex-1 min-h-0 w-full overflow-y-auto overflow-x-hidden"
            style={{ overflowAnchor: "none" }}  // disable browser scroll anchoring — we handle it manually
        >
            <Table className="w-full table-fixed">
                <TableCaption>Properties listed for sale.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-8">S.N</TableHead>
                        <TableHead className="w-28">Title</TableHead>
                        <TableHead className="w-32">Location</TableHead>
                        <TableHead className="w-20 text-right">
                            Price <span className="text-gray-500 text-xs">in Rs</span>
                        </TableHead>
                        {!isMobile && <TableHead>Description</TableHead>}
                        <TableHead className="w-12 text-center">Fav</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allProperties.map((v, i) => (
                        <TableRow key={v.id}>
                            <TableCell className="align-top">{i + 1}</TableCell>
                            <TableCell className="align-top wrap-break-words whitespace-normal w-28">{v.title}</TableCell>
                            <TableCell className="align-top wrap-break-words whitespace-normal w-32">{`${v.province}, ${v.city}`}</TableCell>
                            <TableCell className="align-top text-right w-20">{v.price}</TableCell>
                            {!isMobile && (
                                <TableCell className="align-top wrap-break-words whitespace-normal">
                                    {v.description}
                                </TableCell>
                            )}
                            <TableCell className="align-top text-center w-12">
                                {v.fav ? (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button title="More" variant="outline" size="icon">
                                                <EllipsisIcon className="w-4 h-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent side="left">
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem>Remove</DropdownMenuItem>
                                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                            </DropdownMenuGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                ) : (
                                    <Button title="Add" variant="outline" size="icon">
                                        <HeartIcon className="w-4 h-4" />
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {propIsFetchingNextPage && (
                <p className="text-center text-sm text-gray-500 py-2">Loading more...</p>
            )}

            {/* overflow-anchor: none stops the browser from anchoring to this sentinel */}
            <div ref={contentBorder} className="h-1" style={{ overflowAnchor: "none" }} />
        </div>
    )
}