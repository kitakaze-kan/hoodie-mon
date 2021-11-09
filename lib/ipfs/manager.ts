import ipfs from './ipfsFactory'

export const setIpfsJson = async (imageUrl: string, name: string, tokenNum: number):Promise<string> => {
    const meta = JSON.stringify({
        name: `Hoodie-mon #${tokenNum.toString()} @${name}`,
        description: `A collection of mistery Hoodie-mon. Each Hoodie-mon is the only one in the world.`,
        image: imageUrl
    });
    const {path} = await ipfs.add(meta)
    return `https://ipfs.infura.io/ipfs/${path}`
}

export const setImageToIpfs = async (blob: Blob):Promise<string> => {
    const {path} = await ipfs.add(blob)
    return `https://ipfs.infura.io/ipfs/${path}`
}