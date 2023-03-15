import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function useRequiredAuth() {
    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        if(!session && typeof session != "undefined") {
            router.push("/")
        }
    }, [session, router])

    return session
}

