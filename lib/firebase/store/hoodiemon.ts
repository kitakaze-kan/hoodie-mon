import { firestore } from '../app'
import { collection, setDoc, updateDoc, doc, getDocs, collectionGroup } from 'firebase/firestore/lite'
import { HoodiemonType } from '../../../interfaces';


export const createTokenDoc = (address: string, token: HoodiemonType):Promise<void> => 
    new Promise((resolve, reject) => {
        setDoc(doc(firestore, "hoodieMon", address, "tokens", token.name), token).then(() => {
            resolve()
        })
        .catch((error) => {
            reject(error)
        });
})

export const updateTokenId = (address: string, name: string, tokenId: string):Promise<void> => 
    new Promise((resolve, reject) => {
        updateDoc(doc(firestore, "hoodieMon", address, "tokens", name), {tokenId: tokenId}).then(() => {
            resolve()
        })
        .catch((error) => {
            reject(error)
        });
})

export const getMintedTokens = (address: string):Promise<HoodiemonType[]> => 
new Promise((resolve, reject) => {
    getDocs(collection(firestore, 'hoodieMon', address, "tokens"))
    .then((result) => {
        let txs:HoodiemonType[] = []
        result.docs.forEach(doc => {
            const tx = doc.data() as HoodiemonType
            txs.push(tx)
        })
        txs = txs.sort(function(a,b){
            const aNum = Number(a.tokenId)
            const bNum = Number(b.tokenId)
            if(aNum<bNum) return -1;
            if(aNum>bNum) return 1;
            return 0;
          });
        resolve(txs)
    })
    .catch((error) => {
        reject(error)
    });
})

export const getAllMintedTokens = ():Promise<HoodiemonType[]> => 
new Promise(async (resolve) => {
    let resultArr:HoodiemonType[] = []
    const tokens = await getDocs(collectionGroup(firestore, 'tokens'))
    console.log(tokens)
    for(const doc of tokens.docs){
        const tx = doc.data() as HoodiemonType
        resultArr.push(tx)
    }
    resultArr = resultArr.sort(function(a,b){
        const aNum = Number(a.tokenId)
        const bNum = Number(b.tokenId)
        if(aNum<bNum) return -1;
        if(aNum>bNum) return 1;
        return 0;
      });
    resolve(resultArr)
})