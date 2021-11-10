import ipfs from './ipfsFactory'

export const setJsonToIpfs = async (imageUrl: string, name: string):Promise<string> => {
    const meta = JSON.stringify({
        name: `The Hoodie Crew  @${name}`,
        description: `A collection of mistery Hoodie crew. Each Hoodie crew is the only one in the world.`,
        image: imageUrl
    });
    const {path} = await ipfs.add(meta)
    return `https://ipfs.infura.io/ipfs/${path}`
}

export const setImageToIpfs = async (blob: Blob):Promise<string> => {
    const {path} = await ipfs.add(blob)
    return `https://ipfs.infura.io/ipfs/${path}`
}