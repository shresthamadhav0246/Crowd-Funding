import React, { useContext, createContext, useState } from "react"
import Web3Modal from "web3modal" // Correct case

import { ethers } from "ethers"

import { CrowdFundingAddress, CrowdFundingAbi } from "./constants"

const fetchContract = (signerOrProvider) =>
    new ethers.Contract(CrowdFundingAddress, CrowdFundingAbi, signerOrProvider)

export const CrowdFundingContext = createContext()

export const CrowdFundingProvider = ({ children }) => {
    const title = "First contract title"
    const [currentAccount, setCurrentAccount] = useState("")

    const createCampaign = async (campaign) => {
        const { title, description, amount, deadline } = campaign
        console.log(campaign)

        const web3modal = new Web3Modal()
        const connection = await web3modal.connect()
        const provider = new ethers.providers.Web3Provider(connection) // Correct class name

        console.log("Provider:", provider)

        const signer = provider.getSigner()
        console.log("Signer:", signer)

        const contract = fetchContract(signer)
        console.log("Contract:", contract)
        console.log(currentAccount)

        try {
            const transaction = await contract.createCampaign(
                currentAccount,
                title,
                description,
                ethers.utils.parseUnits(amount, 18),
                Math.floor(new Date(deadline).getTime() / 1000)
            )

            await transaction.wait()
            console.log("Contract call success", transaction)
        } catch (error) {
            console.log(error)
            console.log("Transaction failed")
        }
    }

    const getCampaigns = async () => {
        try {
            const provider = new ethers.providers.JsonRpcProvider(
                "https://eth-sepolia.g.alchemy.com/v2/l6CNn6moSnmhGfzlVkTyPC_YTwtf0_We"
            )
            const contract = fetchContract(provider)

            const campaigns = await contract.getCampaigns()
            const parsedCampaigns = campaigns.map((campaign, i) => ({
                owner: campaign.owner,
                title: campaign.title,
                description: campaign.description,
                target: ethers.utils.formatEther(campaign.target.toString()),

                deadline: campaign.deadline.toNumber(),
                amountCollected: ethers.utils.formatEther(
                    campaign.amountCollected.toString()
                ),

                pId: i,
            }))

            return parsedCampaigns
        } catch (error) {
            console.log("Error!!!", error)
            console.error("error fetching campaigns", error)
            throw error
        }
    }

    const getUserCampaings = async () => {
        try {
            const provider = new ethers.providers.JsonRpcProvider(
                "https://eth-sepolia.g.alchemy.com/v2/l6CNn6moSnmhGfzlVkTyPC_YTwtf0_We"
            )
            const contract = fetchContract(provider)

            const allCampaigns = await contract.getCampaigns()
            console.log(allCampaigns)

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            })
            const currentUser = accounts[0]

            const filteredCampaings = allCampaigns.filter((campaign) => {
                if (currentUser) {
                    return (
                        campaign.owner.toLowerCase() ===
                        currentUser.toLowerCase()
                    )
                }
            })

            const userData = filteredCampaings.map((campaign, i) => ({
                owner: campaign.owner,
                title: campaign.title,
                description: campaign.description,
                target: ethers.utils.formatEther(campaign.target.toString()),
                deadline: campaign.deadline.toNumber(),
                amountCollected: ethers.utils.formatEther(
                    campaign.amountCollected.toString()
                ),
                pId: i,
            }))

            return userData
        } catch (error) {
            console.log("Error!", error)
        }
    }

    const donate = async (pId, amount) => {
        const web3modal = new Web3Modal()
        const connection = await web3modal.connect()
        const provider = new ethers.providers.Web3Provider(connection) // Correct class name

        const signer = provider.getSigner()
        const contract = fetchContract(signer)

        const campaignData = await contract.donateToCampaign(pId, {
            value: ethers.utils.parseEther(amount),
        })
        await campaignData.wait()
        location.reload()
        return campaignData
    }

    const getDonations = async (pId) => {
        const provider = new ethers.providers.JsonRpcProvider(
            "https://eth-sepolia.g.alchemy.com/v2/l6CNn6moSnmhGfzlVkTyPC_YTwtf0_We"
        )
        const contract = fetchContract(provider)

        const donations = await contract.getDonators(pId)
        const numberOfdonations = donations[0].length

        const parsedDonations = []

        for (let i = 0; i < numberOfdonations; i++) {
            parsedDonations.push({
                donator: donations[0][i],
                donation: ethers.utils.formatEther(donations[1][i].toString()),
            })
        }

        return parsedDonations
    }

    const checkIfWalletConnected = async () => {
        try {
            if (!window.ethereum) {
                return setOpenError(true), setError("Install Metamask")
            }
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            })
            if (accounts.length) {
                setCurrentAccount(accounts[0])
            } else {
                console.log("No Account Found")
            }
        } catch (error) {
            console.log("Something wronf while connecting to wallet")
        }
    }

    React.useEffect(() => {
        checkIfWalletConnected()
    }, [])

    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                return setOpenError(true), setError("Install Metamask")
            }
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            })

            setCurrentAccount(accounts[0])
        } catch (error) {
            console.log("Something wronf while connecting to wallet")
        }
    }

    return (
        <CrowdFundingContext.Provider
            value={{
                title,
                currentAccount,
                createCampaign,
                getCampaigns,
                getUserCampaings,
                getDonations,
                donate,
                connectWallet,
            }}
        >
            {children}
        </CrowdFundingContext.Provider>
    )
}
