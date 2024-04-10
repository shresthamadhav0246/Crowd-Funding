import React, { useContext, useState } from "react"
import { CrowdFundingContext } from "@/context/CrowdFunding"

const Hero = ({ title, createCampaign }) => {
    const { currentAccount, connectWallet } = useContext(CrowdFundingContext)

    const [isConnected, setIsConnected] = useState(false)

    const [campaign, setCampaign] = useState({
        title: "",
        description: "",
        amount: "",
        deadline: "",
    })

    const createNewCampaign = async (e) => {
        console.log("create campaign function called")
        e.preventDefault() // This will now work to prevent the form from submitting traditionally

        if (!currentAccount) {
            // Check if user is connected to the wallet
            alert("Please connect your wallet before creating a campaign.")
            return
        }

        try {
            // Now correctly passing the collected form data to the createCampaign function
            const data = await createCampaign(campaign)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <section class="dark:bg-gray-100 dark:text-gray-800">
                <div class="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
                    <div class="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                        <h1 class="text-3xl font-bold leading-none sm:text-5xl">
                            <span class="dark:text-violet-600">
                                Crypto Crowd Funding
                            </span>
                        </h1>
                        <p class="mt-6 mb-8 text-lg sm:mb-12">
                            Crypto crowdfunding is a method of raising capital
                            <br class="hidden md:inline lg:hidden" />
                            through the issuance of digital assets or tokens on
                            a blockchain.
                        </p>
                        <div class="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
                            <a
                                rel="noopener noreferrer"
                                href="#"
                                class="px-8 py-3 text-lg font-semibold rounded dark:bg-violet-600 dark:text-gray-50"
                            >
                                Fund Me
                            </a>
                            <a
                                rel="noopener noreferrer"
                                href="#"
                                class="px-8 py-3 text-lg font-semibold border rounded dark:border-gray-800"
                            >
                                Create Campaign
                            </a>
                        </div>
                    </div>
                    <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
                        <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                            <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                                Campaign
                            </h3>
                            <form>
                                <div className="mb-1 sm:mb-2">
                                    <label
                                        htmlFor="title"
                                        className="inline-block mb-1 font-medium"
                                    >
                                        Title
                                    </label>
                                    <input
                                        onChange={(e) => {
                                            setCampaign({
                                                ...campaign,
                                                title: e.target.value,
                                            })
                                        }}
                                        placeholder="Title"
                                        required
                                        type="textarea"
                                        className="flex-grow w-full h-12 px-4 mb-2 transition
                            duration-200 bg-white border border-gray-300 rounded shadow-sm
                            appearance-none focus:border-purple-400 focus:outline-none focus:shadow-orange-50"
                                        id="title"
                                        name="title"
                                    />
                                </div>

                                <div className="mb-1 sm:mb-2">
                                    <label
                                        htmlFor="description"
                                        className="inline-block mb-1 font-medium"
                                    >
                                        Description
                                    </label>
                                    <input
                                        onChange={(e) => {
                                            setCampaign({
                                                ...campaign,
                                                description: e.target.value,
                                            })
                                        }}
                                        placeholder="Description"
                                        required
                                        type="text"
                                        className="flex-grow w-full h-12 px-4 mb-2 transition
                            duration-200 bg-white border border-gray-300 rounded shadow-sm
                            appearance-none focus:border-purple-400 focus:outline-none focus:shadow-orange-50"
                                        id="description"
                                        name="description"
                                    />
                                </div>

                                <div className="mb-1 sm:mb-2">
                                    <label
                                        htmlFor="amount"
                                        className="inline-block mb-1 font-medium"
                                    >
                                        Amount
                                    </label>
                                    <input
                                        onChange={(e) => {
                                            setCampaign({
                                                ...campaign,
                                                amount: e.target.value,
                                            })
                                        }}
                                        placeholder="Amount"
                                        required
                                        type="number"
                                        className="flex-grow w-full h-12 px-4 mb-2 transition
                            duration-200 bg-white border border-gray-300 rounded shadow-sm
                            appearance-none focus:border-purple-400 focus:outline-none focus:shadow-orange-50"
                                        id="amount"
                                        name="amount"
                                    />
                                </div>

                                <div className="mb-1 sm:mb-2">
                                    <label
                                        htmlFor="deadline"
                                        className="inline-block mb-1 font-medium"
                                    >
                                        Deadline
                                    </label>
                                    <input
                                        onChange={(e) => {
                                            setCampaign({
                                                ...campaign,
                                                deadline: e.target.value,
                                            })
                                        }}
                                        placeholder="Deadline"
                                        required
                                        type="date"
                                        className="flex-grow w-full h-12 px-4 mb-2 transition
                            duration-200 bg-white border border-gray-300 rounded shadow-sm
                            appearance-none focus:border-purple-400 focus:outline-none focus:shadow-orange-50"
                                        id="deadline"
                                        name="deadline"
                                    />
                                </div>

                                <div className="mb-1 sm:mb-1">
                                    <button
                                        onClick={(e) => createNewCampaign(e)}
                                        type="submit"
                                        className="text-white inline-flex items-center justify-center w-full h-12 px-4 mb-2 transition
                                    duration-200 bg-gray-800 hover:bg-gray-600 border border-gray-300 rounded shadow-sm
                                    "
                                    >
                                        Create Campaign
                                    </button>
                                </div>
                                <p className="text-xs text-gray-400 sm:text-sm">
                                    Create a Campaign for raise funds
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Hero
