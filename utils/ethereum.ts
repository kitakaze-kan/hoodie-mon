// Check for MetaMask wallet browser extension
export const hasEthereum = () =>  {
    return typeof window !== 'undefined' && typeof (window as any).ethereum !== 'undefined'
}