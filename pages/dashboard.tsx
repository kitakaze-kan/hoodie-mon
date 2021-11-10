import type { NextPage } from "next";
import { isMobile } from "react-device-detect"
import { ethers } from 'ethers'
import detectEthereumProvider from '@metamask/detect-provider'
import HoodieMonTokenArtifact from '../src/artifacts/contracts/HoodieMonToken.sol/HoodieMonToken.json' 
import { HoodieMonToken } from '../typechain'
import { useEffect, useState } from "react";
import { HoodiemonType } from "../interfaces";
import { getAllMintedTokens } from "../lib/firebase/store/hoodiemon";
import { useTranslate } from "../lib/lang/useTranslate";

type TokenURIType = {
    tokenid: number
    uri: string
}
const DashboardPage: NextPage = () => {

    const t = useTranslate()

    const [hoodiemonContract, setHoodiemonContract] = useState<HoodieMonToken | null>(null)
    const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null)
    const [tokenUris, setTokenUris] = useState<TokenURIType[]>([])
    const [balance, setBalance] = useState<number>(0)
    const [connectedWalletAddress, setConnectedWalletAddressState] = useState('')
    const [message, setMessage] = useState('')
    const [totalTokens, setTotalTokens] = useState<number>(0)
    const [mintedTokens, setMintedTokens] = useState<HoodiemonType[]>([])

    useEffect(() => {

        const init = async () => {
            const ethereumProvider = await detectEthereumProvider({ mustBeMetaMask: true }) as ethers.providers.ExternalProvider
            if (ethereumProvider && window.ethereum?.isMetaMask) {
                await requestAccount()

                const prov = new ethers.providers.Web3Provider(ethereumProvider);
                setProvider(prov)
                const signer = prov.getSigner()
                if(!process.env.NEXT_PUBLIC_HOODIEMON_ADDRESS) return

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
            if(!process.env.NEXT_PUBLIC_HOODIEMON_ADDRESS) return
            await requestAccount()  
            try {
                if(!(hoodiemonContract && provider)) return
                const balance = await provider.getBalance(process.env.NEXT_PUBLIC_HOODIEMON_ADDRESS);
                setBalance(Number(ethers.utils.formatEther(balance.toString())))
                const totalSupply = await hoodiemonContract.totalSupply({from: connectedWalletAddress})
                setTotalTokens(Number(totalSupply))
                console.log("totalSupply", Number(totalSupply))

                let tokenArr:TokenURIType[] = []
                for(let i=1; i<=Number(totalSupply); i++) {
                    console.log("token #", i)
                    const tokenUri = await hoodiemonContract.tokenURI(i)
                    const tokenUriObg:TokenURIType = {
                        tokenid: i,
                        uri:tokenUri
                    }
                    tokenArr.push(tokenUriObg)
                }
                setTokenUris(tokenArr)
            } catch(error) {
                console.log("error", error)
                return;
            }
        }

        async function getMintedTokensFromFB() {
            if(!hoodiemonContract) return
            const tokens = await getAllMintedTokens()
            console.log(tokens)
            setMintedTokens(tokens)
        }
        
        getToken();
        getMintedTokensFromFB()
    },[connectedWalletAddress])

    async function requestAccount() {
        await (window as any).ethereum.request({ method: 'eth_requestAccounts' } )
    }

    const connectWallet = async () => {
        const ethereumProvider = await detectEthereumProvider({ mustBeMetaMask: true }) as ethers.providers.ExternalProvider
        if (ethereumProvider && window.ethereum?.isMetaMask) {
            await requestAccount()

            const prov = new ethers.providers.Web3Provider(ethereumProvider);
            setProvider(prov)
            const signer = prov.getSigner()
            if(!process.env.NEXT_PUBLIC_HOODIEMON_ADDRESS) return

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

    const toCheckTokenUri = (tokenUri: string) => {
        window.open(tokenUri, '_blank')
    }

    const withdraw = async () => {

        if(!hoodiemonContract) return
        try {
            const transaction = await hoodiemonContract.withdraw({ from: connectedWalletAddress})
            await transaction.wait()
        } catch (error) {
            console.log(error)
        }
    }

    const openMetamaskViaDeepLink = () => {
        window.open(process.env.NEXT_PUBLIC_METAMASK_DEEP_LINK, '_blank')
    }

    return (
        <>
            <div className="w-full relative bg-darkgray text-subwhite mx-auto min-h-screen">
                <div className="py-8 px-4 sm:py-20 sm:px-12 mx-auto text-center max-w-5xl">
                    <div className="w-full text-center">
                        <h1 className="font-bold text-2xl sm:text-4xl py-2 text-white">{t.TITLE}</h1>
                        <h2 className="font-bold italic text-xl sm:text-3xl py-4 text-white">TOTAL BALANCE: {balance}</h2>
                        <h2 className="font-bold italic text-xl sm:text-3xl py-4 text-white">TOTAL TOKENS: {totalTokens}</h2>
                        <button
                            className="bg-purple-600 border-purple-600 text-white h-12 px-4 sm:px-4 text-xs sm:text-lg rounded-md w-40 sm:w-96 font-bold"
                                onClick={() => withdraw()}
                            >
                                Withdraw
                        </button>
                        {message && (
                            <p className="text-lg p-4">{message}</p>
                        )}
                    </div>
                    <div className="py-10 mx-auto text-center w-full">
                        {!connectedWalletAddress && (
                            <button
                                className="bg-purple-600 border-purple-600 text-white py-4 px-20 text-xs sm:text-lg rounded-md mx-10"
                                onClick={connectWallet}
                            >
                                {t.CONNECT_WALLET}
                            </button>
                        )}
                        <h1 className="font-bold text-2xl sm:text-4xl py-2 text-white">ALL TOKEN from chain</h1>
                        <div className="w-full rounded-lg shadow-lg">
                            <ul className="divide-y-2 divide-gray-100">
                                {tokenUris && (
                                    tokenUris.map((token) => {
                                        return (
                                            <li key={token.tokenid} className="p-3 hover:bg-purple-600 hover:text-purple-200">
                                                <p className="text-sm font-bold text-left pt-4">#{token.tokenid} {token.uri}</p>
                                            </li>
                                        )
                                    })
                                )}
                            </ul>
                        </div>
                        <h1 className="font-bold text-2xl sm:text-4xl py-2 text-white">ALL TOKEN from firestore</h1>
                        <div className="py-4 sm:py-12 grid grid-cols-4 gap-4">
                            {mintedTokens && (
                                mintedTokens.map(token => {
                                    return (
                                        <div key={token.tokenId} className="sm:px-2 text-center col-span-1">
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
                </div>
            </div>
            {/* {showLoading && (
                <LoadingModal />
            )}
            {showModal && (
                <BaseModal titleText={modalTitle}　mainText={modalMainText} onClickAcceptBtn={()=>closeModal()} onClickCloseModal={()=>closeModal()}/>
            )} */}
        </>
    );
};

export default DashboardPage;