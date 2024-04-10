import React, { useEffect, useState } from "react"
import { CrowdFundingContext } from "@/context/CrowdFunding"

const PopUp = ({ setOpenModal, donate, donateFunction, getDonations }) => {
    const [amount, setAmount] = useState("")
    const [allDonations, setAllDonations] = useState()

    const { currentAccount, connectWallet } = useContext(CrowdFundingContext)

    const createDonation = async () => {
        if (!currentAccount) {
            // Check if user is connected to the wallet
            alert("Please connect your wallet before creating a campaign.")
            return
        }

        try {
            const data = await donateFunction(donate.pId, amount)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const donationsListData = getDonations(donate.pId)

        return async () => {
            const donationData = await donationsListData
            setAllDonations(donationData)
        }
    }, [])

    console.log(allDonations)

    return (
        <>
            <div
                className="justify-center items-center flex overflow-hidden
    overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div
                        className="border-0 rounded-lg shadow-lg relative flex
    flex-col w-full bg-white outline-none focus:outline-none"
                    >
                        <div className="flex items-start justify-between p-5 border-b border-solid border-salte-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                {donate.title}
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5
            float-right text-3xl leadign-none font-semibold outline-none focus:outline-none"
                                onClick={() => setOpenModal(false)}
                            >
                                <span
                                    className="bg-transparent text-black opacity-5
                h-6 w-6 text-2xl block outline-none focus:outline-none"
                                >
                                    X
                                </span>
                            </button>
                        </div>

                        <div className="relative p-6 flex-auto">
                            <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                {donate.description}
                            </p>
                            <input
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="amount"
                                required
                                className="flex-grow w-full h-12 px-4 mb-2 bg-gray-100 border-gray-300 rounded shadow-sm"
                                id="amount"
                                name="amount"
                                type="text"
                            />
                            <p className="font-semibold pt-3">Donators</p>
                            {allDonations?.map((donate, i) => (
                                <p
                                    className="my-1 text-black text-sm leading-relaxed"
                                    key={i}
                                >
                                    {i + 1}: {donate.donation + "ETH"}{" "}
                                    {donate.donator.slice(0, 30)}
                                </p>
                            ))}
                        </div>

                        <div
                            className="flex items-center justify-end p-6 border-t border-solid
                   border-salte-200  rounded-b "
                        >
                            <button
                                className=" text-red-500 p-1 ml-auto bg-transparent"
                                type="button"
                                onClick={() => setOpenModal(false)}
                            >
                                Close
                            </button>
                            <button
                                className="text-gray-500 ms-5 active:bg-emerald-600 font-bold uppercase text-sm *:px-6 py-3 rounded shadow hover:shadow-lg outline-none
            "
                                type="button"
                                onClick={() => createDonation()}
                            >
                                Donate
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default PopUp
