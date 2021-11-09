import { firestore } from '../app'
import { collection, setDoc, doc, getDocs } from 'firebase/firestore/lite'
import { HoodiemonType } from '../../../interfaces';


export const createTokenDoc = (address: string, tokenId: string, token: HoodiemonType):Promise<string> => 
    new Promise((resolve, reject) => {
        setDoc(doc(firestore, "hoodieMon", address, "tokens", tokenId), token).then(() => {
            resolve(tokenId)
        })
        .catch((error) => {
            reject(error)
        });
})

export const getMintedTokens = (address: string):Promise<HoodiemonType[]> => 
new Promise((resolve, reject) => {
    getDocs(collection(firestore, 'hoodieMon', address, "tokens"))
    .then((result) => {
        const txs:HoodiemonType[] = []
        result.docs.forEach(doc => {
            const tx = doc.data() as HoodiemonType
            txs.push(tx)
        })
        resolve(txs)
    })
    .catch((error) => {
        reject(error)
    });
})