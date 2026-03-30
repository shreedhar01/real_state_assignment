import { Link, useParams } from "react-router-dom"
import { useEditFavouriteProperty, useGetPropertyInfoById } from "../lib/api/hooks/properties"
import { ArrowLeftIcon } from "lucide-react"
import { Button } from "../components/ui/button"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet
} from "../components/ui/field"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { useEffect, useState, type SubmitEventHandler } from "react"
import { editFavouritePropertySchema } from "../schema/property.types"
import toast from "react-hot-toast"

export const EditFavouriteProperty = () => {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState("")
    const [active, setActive] = useState(false)
    const [error, setError] = useState<Map<string, string>>(new Map)

    const { propertyId } = useParams()
    const { data } = useGetPropertyInfoById(Number(propertyId))

    useEffect(() => {
        if (data?.title === title &&
            Number(data.price) === price &&
            data.description === description
        ) return setActive(false)
        setActive(true)
    }, [title, price, description])

    useEffect(() => {
        if (!data) return
        setTitle(data?.title)
        setPrice(Number(data?.price))
        setDescription(data?.description)
    }, [data])
    const editProperytMutation = useEditFavouriteProperty()

    const handleEditSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        if (data?.title === title &&
            Number(data.price) === price &&
            data.description === description
        ) return

        const isValid = editFavouritePropertySchema.safeParse({
            id: Number(propertyId),
            title,
            price,
            description
        })
        if (!isValid.success) {
            const newMap = new Map()
            isValid.error.issues.forEach((v) => {
                newMap.set(v.path[0], v.message)
            })
            setError(newMap)
            return console.log("some field are missing", isValid.error.issues)
        }
        toast.promise(
            editProperytMutation.mutateAsync(isValid.data),
            {
                loading: <b>Editing property info...</b>,
                success: () => {
                    setActive(false)
                    return <b>Successfully edit property info...</b>
                },
                error: <b>Error while editting property info...</b>
            }
        )
    }

    return (
        <div className="flex-1 min-h-0 flex items-center justify-center">
            <main className="flex-1 min-h-1 flex flex-col gap-y-8 w-full md:max-w-7xl px-2">
                <div className="flex items-center justify-between">
                    <Link to="/dashboard">
                        <Button title="back" variant="outline">
                            <ArrowLeftIcon />
                        </Button>
                    </Link>
                    <p>Edit Property</p>
                </div>
                <form onSubmit={handleEditSubmit} className="flex w-full items-center justify-center  px-4">
                    <FieldSet className="w-full max-w-2xl rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-sm p-8">

                        {/* Header */}
                        <div className="mb-6 pb-5 border-b border-zinc-100 dark:border-zinc-800">
                            <FieldLegend className="text-lg font-semibold tracking-tight">Edit Property</FieldLegend>
                            <FieldDescription className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                                Edit your favourite property info.
                            </FieldDescription>
                        </div>

                        <FieldGroup className="space-y-6">

                            {/* Title + Price row */}
                            <Field>
                                <p className="text-xs font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">
                                    Basic Info
                                </p>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <FieldLabel htmlFor="title" className="text-sm font-medium">Title</FieldLabel>
                                        <Input
                                            id="title"
                                            autoComplete="off"
                                            placeholder={data?.title}
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="mt-1 w-full"
                                        />
                                        {error.has("title") ? <FieldError>{error.get("title")}</FieldError> : ""}
                                    </div>
                                    <div className="w-36">
                                        <FieldLabel htmlFor="price" className="text-sm font-medium">Price <span className="text-gray-500 text-xs">in NPRs</span></FieldLabel>
                                        <Input
                                            id="price"
                                            type="number"
                                            min={0}
                                            autoComplete="off"
                                            placeholder={data?.price}
                                            value={price}
                                            onChange={(e) => setPrice(Number(e.target.value))}
                                            className="mt-1 w-full"
                                        />
                                        {error.has("price") ? <FieldError>{error.get("price")}</FieldError> : ""}
                                    </div>
                                </div>
                            </Field>

                            <Field>
                                <p className="text-xs font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">
                                    Location
                                </p>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <FieldLabel htmlFor="province" className="text-sm font-medium">Province</FieldLabel>
                                        <Input
                                            id="province"
                                            autoComplete="off"
                                            placeholder={data?.province}
                                            disabled
                                            className="mt-1 w-full opacity-50 cursor-not-allowed"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <FieldLabel htmlFor="city" className="text-sm font-medium">City</FieldLabel>
                                        <Input
                                            id="city"
                                            autoComplete="off"
                                            placeholder={data?.city}
                                            disabled
                                            className="mt-1 w-full opacity-50 cursor-not-allowed"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <FieldLabel htmlFor="area" className="text-sm font-medium">Area</FieldLabel>
                                        <Input
                                            id="area"
                                            autoComplete="off"
                                            placeholder={data?.area}
                                            disabled
                                            className="mt-1 w-full opacity-50 cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                                <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500 italic">
                                    Location fields are read-only.
                                </p>
                            </Field>

                            {/* Description */}
                            <Field>
                                <FieldLabel htmlFor="description" className="text-sm font-medium">Description</FieldLabel>
                                <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-1">
                                    Give buyers a clear picture of your listing.
                                </p>
                                <Textarea
                                    id="description"
                                    autoComplete="off"
                                    placeholder={data?.description}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="mt-1 w-full max-h-28 resize-y"
                                />
                                {error.has("description") ? <FieldError>{error.get("description")}</FieldError> : ""}
                            </Field>

                        </FieldGroup>
                        <Field orientation="vertical">
                            <Button type="submit" disabled={!active ? true : false}>Edit</Button>
                        </Field>
                    </FieldSet>
                </form>
            </main>
        </div>
    )
}