import { useMutation, useQuery } from "@tanstack/react-query"
import type { CreateAccount, SignIn } from "../../../schema/auth.schema"
import { api } from "../axios"
import axios from "axios"

export function useRegisterUser() {
    return useMutation({
        mutationKey: ["register_user"],
        mutationFn: async (data: CreateAccount) => {
            const response = await api.post("/register", data)

            console.log(response.data.data[0])
            return response.data.data[0]
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                console.log("eeror ::", error.response)
                const message = error.response?.data?.message ?? "Something went wrong"
                console.log(message)
            } else {
                console.log("Unexpected error occurred")
            }
        },
    })
}

export function useSignInUser() {
    return useMutation({
        mutationKey: ["register_user"],
        mutationFn: async (data: SignIn) => {
            const response = await api.post("/signin", data)

            console.log(response.data.data[0])
            return response.data.data[0]
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                console.log("eeror ::", error.response)
                const message = error.response?.data?.message ?? "Something went wrong"
                console.log(message)
            } else {
                console.log("Unexpected error occurred")
            }
        },
    })
}

export function useVerifyMe(){
    return useQuery({
        queryKey:["user:verify"],
        queryFn:async()=>{
            const response = await api.get("/me")
            console.log("response data data :: ",response.data.data)
            return response.data.data
        }
    })
}