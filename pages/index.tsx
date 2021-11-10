import dynamic from "next/dynamic";
import type { NextPage } from "next";
import Image from 'next/image'
import type { ChangeEvent } from "react"
import { isMobile } from "react-device-detect"
import { ethers } from 'ethers'
import detectEthereumProvider from '@metamask/detect-provider'
import HoodieCrewTokenArtifact from '../src/artifacts/contracts/HoodieCrewToken.sol/HoodieCrewToken.json' 
import { HoodieCrewToken } from '../typechain/'
const P5Wrapper = dynamic(() => import("../lib/generative/P5Wrapper"), { ssr: false });
import { setAttribute, pixelForSp } from "../lib/generative/shetches/pixel";
import { useEffect, useState } from "react";
import { AttributeProps, createAttr } from "../lib/generative/attributes/createAttribute";
import { setImageToIpfs, setJsonToIpfs } from "../lib/ipfs/manager";
import { HoodieCrewType } from "../interfaces";
import { createTokenDoc, getMintedTokens, updateTokenId } from "../lib/firebase/store/hoodiecrew";
import { useTranslate } from "../lib/lang/useTranslate";
import { LoadingModal } from "../components/LoadingModal";
import { BaseModal } from "../components/BaseModal";


const SamplePage: NextPage = () => {

    const t = useTranslate()

    const PRE_PRICE = "3"
    const PRICE = "10"
    const [hoodieCrewContract, setHoodieCrewContract] = useState<HoodieCrewToken | null>(null)
    const [name, setName] = useState('')
    const [shouldShowCaution, setShouldShowCaution] = useState(false)
    const [update, setUpdate] = useState(false)
    const [save, setSave] = useState(false)
    const [isMintable, setIsMintable] = useState(false)
    const [currentAttr, setCurrentAttr] = useState<AttributeProps | null>()
    const [connectedWalletAddress, setConnectedWalletAddressState] = useState('')
    const [message, setMessage] = useState('')
    const [totalTokens, setTotalTokens] = useState<number>(0)
    const [mintedTokens, setMintedTokens] = useState<HoodieCrewType[]>([])
    const [showLoading, setShowLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [modalTitle, setModalTitle] = useState(t.SCCESS_MODAL_TITLE)
    const [modalMainText, setModalMainText] = useState(t.SCCESS_MODAL_TEXT)

    useEffect(() => {

        const init = async () => {
            const ethereumProvider = await detectEthereumProvider({ mustBeMetaMask: true }) as ethers.providers.ExternalProvider
            if (ethereumProvider && window.ethereum?.isMetaMask) {
                await requestAccount()

                const prov = new ethers.providers.Web3Provider(ethereumProvider);
                const signer = prov.getSigner()
                if(!process.env.NEXT_PUBLIC_HOODIECREW_ADDRESS) return

                try {
                    const contract = new ethers.Contract(process.env.NEXT_PUBLIC_HOODIECREW_ADDRESS, HoodieCrewTokenArtifact.abi, signer) as HoodieCrewToken
                    setHoodieCrewContract(contract)
                    const signerAddress = await signer.getAddress()
                    setConnectedWalletAddressState(signerAddress)
                    setMessage("")
                } catch(error) {
                    setMessage('No wallet connected')
                    console.log("error", error)
                    return;
                }
            } else {
                setMessage(`MetaMask unavailable. Please install it.`)
              return;
            };
          };
        init();

    },[])

    useEffect( () => {
        async function getToken() {
            const ethereumProvider = await detectEthereumProvider({ mustBeMetaMask: true }) as ethers.providers.ExternalProvider
            if (!(ethereumProvider && window.ethereum?.isMetaMask)) {
                setMessage(`MetaMask unavailable. Please install Metamask App or extension.`)
            }
            if(!process.env.NEXT_PUBLIC_HOODIECREW_ADDRESS) return
            await requestAccount()  
            try {
                if(!(connectedWalletAddress && hoodieCrewContract)) return
                const totalSupply = await hoodieCrewContract.totalSupply()
                setTotalTokens(Number(totalSupply))
            } catch(error) {
                console.log("error", error)
                return;
            }
        }

        async function getMintedTokensFromFB() {
            if(!(connectedWalletAddress && hoodieCrewContract)) return
            const tokens = await getMintedTokens(connectedWalletAddress)
            //chekc!!!
            for(const token of tokens) {
                if(!token.tokenId){
                    const isExist = await hoodieCrewContract.isExistFromOriginName(token.name)
                    if(isExist){
                        const targetId = await hoodieCrewContract.getTokenIdFromOriginName(token.name)
                        await updateTokenId(connectedWalletAddress, token.name, targetId.toString())
                    }
                }
            }
            setMintedTokens(tokens)
        }
        getToken();
        getMintedTokensFromFB()
    },[connectedWalletAddress, hoodieCrewContract])

    useEffect( () => {
        if(!name) {
            setCurrentAttr(null)
            setShouldShowCaution(false)
            return
        }
        setShouldShowCaution(!isRightName(name))
    },[name])

    async function requestAccount() {
        await (window as any).ethereum.request({ method: 'eth_requestAccounts' } )
    }

    const connectWallet = async () => {
        const ethereumProvider = await detectEthereumProvider({ mustBeMetaMask: true }) as ethers.providers.ExternalProvider
        if (ethereumProvider && window.ethereum?.isMetaMask) {
            await requestAccount()

            const prov = new ethers.providers.Web3Provider(ethereumProvider);
            const signer = prov.getSigner()
            if(!process.env.NEXT_PUBLIC_HOODIECREW_ADDRESS) return

            try {
                const signerAddress = await signer.getAddress()
                setConnectedWalletAddressState(signerAddress)
                setMessage("")
            } catch {
                setMessage('No wallet connected')
                return;
            }
        } else {
            if(isMobile) {
                openMetamaskViaDeepLink()
            }
            setMessage(`MetaMask unavailable. Please install Metamask App or extension.`)
            return;
        };
    }

    const handoleDraw = () => {
        if(shouldShowCaution) return
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
        if(shouldShowCaution) return
        if(update){
            setSave(true)
        }
    }

    const MintNFT = async (blob: Blob | null) => {
        if(!(blob && hoodieCrewContract)) return
        setShowLoading(true)

        try {
            let filter = hoodieCrewContract.filters.Transfer(null, connectedWalletAddress, null);
            hoodieCrewContract.on(filter, async (from, to, value) => {
                if("0x0000000000000000000000000000000000000000" === from && connectedWalletAddress === to){
                    const isExist = await hoodieCrewContract.isExistFromOriginName(name)
                    if(isExist){
                        const targetId = await hoodieCrewContract.getTokenIdFromOriginName(name)
                        if(targetId.toString() ===  value.toString()){
                            await updateTokenId(connectedWalletAddress, name, value.toString())
                        }
                    }
                }
            });
            
            const imageToIpfs = await setImageToIpfs(blob)
            const jsonToIpfs = await setJsonToIpfs(imageToIpfs, name)
            const transaction = totalTokens < 100 ? await hoodieCrewContract.preMint(jsonToIpfs, name, { from: connectedWalletAddress, value:  ethers.utils.parseEther(PRE_PRICE)}) : await hoodieCrewContract.mint(jsonToIpfs, name, { from: connectedWalletAddress, value:  ethers.utils.parseEther(PRICE)})
            await transaction.wait()
            await addToFirestore(imageToIpfs, jsonToIpfs)
        } catch (error) {
            console.log("error", error)
            setModalTitle(t.FAILURE_MODAL_TITLE)
            setModalMainText(t.FAILURE_MODAL_TEXT)
            setShowLoading(false)
            setShowModal(true)
        }
        setShowLoading(false)
        setShowModal(true)
    }

    const addToFirestore = async (tokenImage: string, tokenUri: string) => {
        const hoodieCrewDoc: HoodieCrewType = {
            tokenId: null,
            name: name,
            address: connectedWalletAddress,
            imageUrl: tokenImage,
            tokenUri: tokenUri,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        await createTokenDoc(connectedWalletAddress, hoodieCrewDoc)
    }

    const toCheckTokenUri = (tokenUri: string) => {
        window.open(tokenUri, '_blank')
    }

    const withdraw = async () => {

        if(!hoodieCrewContract) return
        try {
            const transaction = await hoodieCrewContract.withdraw({ from: connectedWalletAddress})
            await transaction.wait()
        } catch (error) {
            console.log(error)
        }
    }

    const closeModal = () => {
        setModalTitle(t.SCCESS_MODAL_TITLE)
        setModalMainText(t.SCCESS_MODAL_TEXT)
        setShowModal(false)
    }

    const openMetamaskViaDeepLink = () => {
        window.open(process.env.NEXT_PUBLIC_METAMASK_DEEP_LINK, '_blank')
    }

    const isRightName = (name: string):boolean => {
        if(name.match(/[^\x01-\x7E]/)) return false
        return true
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
                                        <P5Wrapper sketch={pixelForSp} update={update} save={save} onClickSave={MintNFT}/>
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
                                {shouldShowCaution && (
                                    <p className="text-red-400 pt-2">{t.NAME_CHECK_CAUTION}</p>
                                )}
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
                                        <div key={token.name} className="sm:px-2 max-w-xs text-center mx-auto">
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
                <LoadingModal text={t.WAITING_FOR_MINT}/>
            )}
            {showModal && (
                <BaseModal titleText={modalTitle}　mainText={modalMainText} onClickAcceptBtn={()=>closeModal()} onClickCloseModal={()=>closeModal()}/>
            )}
        </>
    );
};

export default SamplePage;