import React, { useState, useEffect } from "react"
import Image from "next/image"

import img1 from "../assests/img1.jpeg"
import img2 from "../assests/img2.jpeg"
import img3 from "../assests/img3.jpeg"
import img4 from "../assests/img4.jpeg"
import img5 from "../assests/img5.jpeg"
import img6 from "../assests/img6.jpeg"

export default function Card({
    allCampaigns,
    setOpenModal,
    setDonateCampaign,
    setDonate,
    title,
}) {
    const [image, setImage] = useState(null)
    const [expandedState, setExpandedState] = useState({})

    const toggleDescription = (key) => {
        setExpandedState((prevState) => ({
            ...prevState,
            [key]: !prevState[key],
        }))
    }

    useEffect(() => {
        setImage(getRandomImage())
    }, [])

    const daysLeft = (deadline) => {
        const deadlineInMs = deadline * 1000
        const difference = new Date(deadlineInMs).getTime() - Date.now()
        const remainingDays = difference / (1000 * 3600 * 24)
        return remainingDays.toFixed(0)
    }

    const images = [img1, img2, img3, img4, img5, img6]
    const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * images.length)
        return images[randomIndex]
    }

    return (
        <>
            <div
                className="px-4 py-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl
            md:px-24 lg:px-8 "
            >
                <h1 className="font-bold text-gray-700 py-4">{title}</h1>
                <div className="grid gap-2 lg:grid-cols-4 md:grid-cols-2">
                    {allCampaigns?.map((items, key) => (
                        <div
                            onClick={() => (
                                setDonateCampaign(items), setOpenModal(true)
                            )}
                            className="w-full rounded-lg shadow-md lg:max-w-sm cursor-pointer"
                            key={key}
                        >
                            <Image
                                className="object-cover w-full h-48"
                                src={getRandomImage()}
                                alt="image"
                            />

                            <div className="p-4">
                                <p className="pt-1 text-[12px] font-normal text-gray-600 block">
                                    Days Left:{daysLeft(items.deadline)}
                                </p>
                                <h4 className="text-xl font-semibold text-gray-600">
                                    {items.title}
                                </h4>
                                <div
                                    className={`${
                                        !expandedState[key]
                                            ? "overflow-hidden max-h-24"
                                            : ""
                                    } relative`}
                                >
                                    <p className="text-[15px] text-gray-500 hover:text-gray-700 mt-2">
                                        {items.description}
                                    </p>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        toggleDescription(key)
                                    }}
                                    className="text-blue-500 underline mt-2"
                                >
                                    {expandedState[key] ? "Less" : "More"}
                                </button>

                                <div className="flex items-start justify-between">
                                    <p className="font-semibold text-[12px]">
                                        Target: {items.target} ETH
                                    </p>
                                    <p className="font-semibold text-[12px]">
                                        Raised: {items.amountCollected} ETH
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
