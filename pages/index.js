import Image from "next/image"
import { Inter } from "next/font/google"
import Header from "../components/Header"
import Footer from "@/components/Footer"
import { CrowdFundingProvider } from "@/context/CrowdFunding"
import Main from "@/components/Main"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
    return (
        <>
            <CrowdFundingProvider>
                <Header />
                <Main />
                <Footer />
            </CrowdFundingProvider>
        </>
    )
}
