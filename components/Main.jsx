import React, { useEffect, useContext, useState } from "react"

import { CrowdFundingContext } from "@/context/CrowdFunding"
import Hero from "@/components/Hero"
import Card from "@/components/Card"
import PopUp from "@/components/PopUp"

const Main = () => {
    const {
        title,

        createCampaign,
        getCampaigns,
        getUserCampaings,
        getDonations,
        donate,
    } = useContext(CrowdFundingContext)

    const [allCampaigns, setAllCampagins] = useState()
    const [userCampagins, setUserCampaigns] = useState()

    // useEffect(() => {
    //     const getCampaignsData = getCampaigns()
    //     const getUserCampaignsData = getUserCampaings()

    //     return async () => {
    //         const allCampaignsData = await getCampaignsData
    //         const allUserCampaignsData = await getUserCampaignsData
    //         setAllCampagins(allCampaignsData)
    //         setUserCampaigns(allUserCampaignsData)
    //     }
    // }, [])

    useEffect(() => {
        ;(async () => {
            const allCampaignsData = await getCampaigns()
            const allUserCampaignsData = await getUserCampaings()
            setAllCampagins(allCampaignsData)
            setUserCampaigns(allUserCampaignsData)
        })()
    }, [getCampaigns, getUserCampaings])

    console.log("allCampaigns", allCampaigns)
    console.log("userCampaigns", userCampagins)

    const [openModal, setOpenModal] = useState(false)
    const [donateCampaign, setDonateCampaign] = useState()

    return (
        <>
            <Hero titleData={title} createCampaign={createCampaign} />
            <Card
                title="All Listed Campaigns"
                allCampaigns={allCampaigns}
                setOpenModal={setOpenModal}
                setDonateCampaign={setDonateCampaign}
            />

            <Card
                title="Your created Campaign"
                allCampaigns={userCampagins}
                setOpenModal={setOpenModal}
                setDonateCampaign={setDonateCampaign}
            />

            {openModal && (
                <PopUp
                    setOpenModal={setOpenModal}
                    getDonations={getDonations}
                    donate={donateCampaign}
                    donateFunction={donate}
                />
            )}
        </>
    )
}

export default Main
