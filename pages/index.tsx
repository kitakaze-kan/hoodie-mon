import dynamic from "next/dynamic";
import type { NextPage } from "next";
import Image from 'next/image'
import type { ChangeEvent } from "react"
import { ethers } from 'ethers'
import HoodieMonTokenArtifact from '../src/artifacts/contracts/HoodieMonToken.sol/HoodieMonToken.json' 
import { HoodieMonToken } from '../typechain/'
const P5Wrapper = dynamic(() => import("../lib/generative/P5Wrapper"), { ssr: false });
import { setAttribute, pixelForSp } from "../lib/generative/shetches/pixel";
import { useEffect, useState } from "react";
import { AttributeProps, createAttr } from "../lib/generative/attributes/createAttribute";
import { hasEthereum } from "../utils/ethereum";
import { setImageToIpfs, setIpfsJson } from "../lib/ipfs/manager";
import { HoodiemonType } from "../interfaces";
import { createTokenDoc, getMintedTokens } from "../lib/firebase/store/hoodiemon";
import { useTranslate } from "../lib/lang/useTranslate";
import { LoadingModal } from "../components/LoadingModal";
import { BaseModal } from "../components/BaseModal";

const SamplePage: NextPage = () => {

    const t = useTranslate()

    // const PRE_PRICE = "0.002"
    // const PRICE = "0.006"
    const PRE_PRICE = "5"
    const PRICE = "10"
    const [hoodiemonContract, setHoodiemonContract] = useState<HoodieMonToken | null>(null)
    const [name, setName] = useState('')
    // const [tokenImage, setTokenImage] = useState('')
    // const [tokenUri, setTokenUri] = useState('')
    // const [balance, setBalance] = useState<number>(0)
    const [update, setUpdate] = useState(false)
    const [save, setSave] = useState(false)
    const [isMintable, setIsMintable] = useState(false)
    const [currentAttr, setCurrentAttr] = useState<AttributeProps | null>()
    const [connectedWalletAddress, setConnectedWalletAddressState] = useState('')
    const [message, setMessage] = useState('')
    const [totalTokens, setTotalTokens] = useState<number>(0)
    const [mintedTokens, setMintedTokens] = useState<HoodiemonType[]>([])
    const [showLoading, setShowLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [modalTitle, setModalTitle] = useState(t.SCCESS_MODAL_TITLE)
    const [modalMainText, setModalMainText] = useState(t.SCCESS_MODAL_TEXT)


    useEffect( () => {
        if ( !(hasEthereum())) {
            setMessage(`MetaMask unavailable`)
          return
        }

        async function initAddressAndContract() {
            if(!process.env.NEXT_PUBLIC_HOODIEMON_ADDRESS) return
            await requestAccount()  
            const provider = new ethers.providers.Web3Provider((window as any).ethereum);
            const signer = provider.getSigner()
            try {
                const contract = new ethers.Contract(process.env.NEXT_PUBLIC_HOODIEMON_ADDRESS, HoodieMonTokenArtifact.abi, signer) as HoodieMonToken
                setHoodiemonContract(contract)
                const signerAddress = await signer.getAddress()
                setConnectedWalletAddressState(signerAddress)
                setMessage("")
            } catch(error) {
                setMessage('No wallet connected')
                console.log("error", error)
                return;
            }
        }
        
        initAddressAndContract();
    },[])

    useEffect( () => {
        if ( !(hasEthereum())) {
            setMessage(`MetaMask unavailable`)
          return
        }

        async function getToken() {
            if(!process.env.NEXT_PUBLIC_HOODIEMON_ADDRESS) return
            await requestAccount()  
            try {
                if(!hoodiemonContract) return
                // const ownedTokenNum = await hoodiemonContract.balanceOf(connectedWalletAddress)
                // setBalance(Number(ownedTokenNum))
                const totalSupply = await hoodiemonContract.totalSupply({from: connectedWalletAddress})
                setTotalTokens(Number(totalSupply))
            } catch(error) {
                console.log("error", error)
                return;
            }
        }

        async function getMintedTokensFromFB() {
            if(!connectedWalletAddress) return
            const tokens = await getMintedTokens(connectedWalletAddress)
            setMintedTokens(tokens)
        }
        
        getToken();
        getMintedTokensFromFB()
    },[connectedWalletAddress])

    useEffect( () => {
        if(!name) {
            setCurrentAttr(null)
        }
    },[name])

    async function requestAccount() {
        await (window as any).ethereum.request({ method: 'eth_requestAccounts' } )
    }

    const connectWallet = async () => {
        if(! hasEthereum()) {
            setMessage(`MetaMask unavailable`)
            return
          }
        const provider = new ethers.providers.Web3Provider((window as any).ethereum);
        const signer = provider.getSigner()
        try {
            const signerAddress = await signer.getAddress()
            setConnectedWalletAddressState(signerAddress)
            setMessage("")
        } catch {
            setMessage('No wallet connected')
            return;
        }
    }

    const handoleDraw = () => {
        const attr = createAttr(name)
        setAttribute(attr)
        setUpdate(true)
        setSave(false)
        setCurrentAttr(attr)
        setIsMintable(true)
    }

    const handleInput = (e:ChangeEvent<HTMLInputElement>) => {
        setUpdate(false)
        setName(e.target.value)
    }

    const handleSave = () => {
        if(update){
            setSave(true)
        }
    }

    const handleImageData = async (blob: Blob | null) => {
        if(!blob) return
        
        try {
            setShowLoading(true)
            const ipfsImage = await setImageToIpfs(blob)
            const ipfsJson = await setIpfsJson(ipfsImage, name, totalTokens)
            // setTokenImage(ipfsImage)
            // setTokenUri(ipfsJson)

            if(!hoodiemonContract) return

            const transaction = totalTokens < 100 ? await hoodiemonContract.preMint(ipfsJson, name, { from: connectedWalletAddress, value:  ethers.utils.parseEther(PRE_PRICE)}) : await hoodiemonContract.mint(ipfsJson, name, { from: connectedWalletAddress, value:  ethers.utils.parseEther(PRICE)})
            const res = await transaction.wait()
            console.log('res', res)
            if(res.events && res.events.length>0 && res.events[0].args){
                const event = res.events[0].args
                const tokenId:string = Number(event.tokenId).toString()
                console.log('tokenId', tokenId)

                const hoodiemonDoc: HoodiemonType = {
                    tokenId: tokenId,
                    name: name,
                    address: connectedWalletAddress,
                    imageUrl: ipfsImage,
                    tokenUri: ipfsJson,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }

                console.log(hoodiemonDoc)
                await createTokenDoc(connectedWalletAddress, tokenId, hoodiemonDoc)
            } else {
                setModalTitle(t.FAILURE_MODAL_TITLE)
                setModalMainText(t.FAILURE_MODAL_TEXT)
            }

            setShowLoading(false)
            setShowModal(true)
        } catch (error) {
            console.log("error", error)
            setModalTitle(t.FAILURE_MODAL_TITLE)
            setModalMainText(t.FAILURE_MODAL_TEXT)
            setShowLoading(false)
            setShowModal(true)
        }
    }

    const toCheckTokenUri = (tokenUri: string) => {
        window.open(tokenUri, '_blank')
    }

    const withdraw = async () => {

        if(!hoodiemonContract) return
        try {
            const transaction = await hoodiemonContract.withdraw({ from: connectedWalletAddress})
            const res = await transaction.wait()
            console.log('res', res)
        } catch (error) {
            console.log(error)
        }
    }

    const closeModal = () => {
        setModalTitle(t.SCCESS_MODAL_TITLE)
        setModalMainText(t.SCCESS_MODAL_TEXT)
        setShowModal(false)
    }

    return (
        <>
            <div className="w-full relative bg-darkgray text-subwhite mx-auto min-h-screen">
                <div className="py-8 px-4 sm:py-20 sm:px-12 mx-auto text-center max-w-5xl">
                    <div className="w-full text-center">
                        <h1 className="font-bold text-2xl sm:text-4xl py-2 text-white">{t.TITLE}</h1>
                        <h2 className="font-bold italic text-xl sm:text-3xl py-4 text-white">{t.SUB_TITLE}</h2>
                        <p className="text-sm sm:text-xl ">{t.DESCRIPTION}</p>
                    </div>
                    <div className="py-2">
                    <p className="text-sm sm:text-xl py-1 text-white">LIMIT: 10,000 pieces</p>
                        {totalTokens < 100 ? (
                            <>
                                <p className="text-sm sm:text-xl py-1 text-white">PRICE: {`${PRE_PRICE}MATIC at pre sale (the only first 100 pieces.)`} </p>
                                <p className="text-xs sm:text-lg py-1">{`The official price is ${PRICE}MATIC`} </p>
                            </>
                        ): (
                            <>  
                                <p className="text-sm sm:text-xl py-1">PRICE: {`${PRICE}MATIC at sale`} </p>
                                
                            </>
                        )}
                    </div>
                    <div className="w-full text-center py-4 sm:py-8">
                        {!connectedWalletAddress ? (
                            <button
                                className="bg-purple-600 border-purple-600 text-white py-4 px-20 text-xs sm:text-lg rounded-md mx-10"
                                onClick={connectWallet}
                            >
                                {t.CONNECT_WALLET}
                            </button>
                        ): (
                            <div>
                                {(currentAttr && !!name) ? (
                                    <div className="flex flex-auto justify-center items-center my-6">
                                        <P5Wrapper sketch={pixelForSp} update={update} save={save} onClickSave={handleImageData}/>
                                    </div>
                                ): (
                                    <div className="pb-4">
                                        <Image src="/egg.png" width={150} height={150} alt="Hoodie Egg" />
                                    </div>
                                )}
                                {(isMintable && currentAttr && !!name) && (
                                    <button
                                    className="bg-purple-600 border-purple-600 text-white h-12 px-4 sm:px-4 text-xs sm:text-lg rounded-md w-40 sm:w-96 font-bold mt-2 mb-12"
                                        onClick={handleSave}
                                    >
                                        {t.BUTTON_TITLE_MINT}
                                    </button>
                                )}
                                <div className="justify-between items-center max-w-xl mx-auto grid grid-cols-3 gap-2 sm:gap-4">
                                    <div className="col-span-2 w-full">
                                        <input
                                            className="border h-12 text-center w-full"
                                            onChange={handleInput}
                                            placeholder="let's breed!"
                                        />
                                    </div>
                                    <div className="col-span-1 w-full">
                                        <button
                                            className="bg-purple-600 border-purple-600 text-white h-12 px-4 sm:px-4 text-xs sm:text-lg rounded-md w-full"
                                            onClick={handoleDraw}
                                        >
                                            {t.BUTTON_TITLE_PREVIEW}
                                        </button>
                                    </div>
                                    
                                </div>
                            </div>
                        )}
                        {message && (
                            <p className="text-lg p-4">{message}</p>
                        )}
                    </div>
                    <div className="py-10 mx-auto text-center">
                        <h1 className="font-bold text-2xl sm:text-4xl py-2 text-white">{t.TITLE_FOR_OWNED_TOKEN}</h1>
                        <div className="sm:flex sm:flex-1 py-4 sm:py-12">
                            {mintedTokens && (
                                mintedTokens.map(token => {
                                    return (
                                        <div key={token.tokenId} className="sm:px-2 max-w-xs text-center mx-auto">
                                            <img src={token.imageUrl} className="w-full h-auto object-contain mx-auto" />
                                            <div className="text-left">
                                                <p className="text-xs sm:text-lg font-bold text-left pt-4 px-2">#{token.tokenId}</p>
                                                <p className="text-xs sm:text-lg font-bold text-left pb-2 px-2">@{token.name}</p>
                                                <p className="text-xs sm:text-lg font-bold text-left pb-2 px-2 underline cursor-pointer" onClick={() => toCheckTokenUri(token.tokenUri)}>{t.LINK_TOKEN_URI}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            )}
                        </div>
                    </div>
                    <button
                        className="bg-purple-600 border-purple-600 text-white h-12 px-4 sm:px-4 text-xs sm:text-lg rounded-md w-40 sm:w-96 font-bold"
                            onClick={() => withdraw()}
                        >
                            Withdraw
                    </button>
                </div>
            </div>
            {showLoading && (
                <LoadingModal />
            )}
            {showModal && (
                <BaseModal titleText={modalTitle}　mainText={modalMainText} onClickAcceptBtn={()=>closeModal()} onClickCloseModal={()=>closeModal()}/>
            )}
        </>
    );
};

export default SamplePage;