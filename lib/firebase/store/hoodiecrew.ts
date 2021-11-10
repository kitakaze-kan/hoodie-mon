import { firestore } from '../app'
import { collection, setDoc, updateDoc, doc, getDocs, collectionGroup } from 'firebase/firestore/lite'
import { HoodieCrewType } from '../../../interfaces';


export const createTokenDoc = (address: string, token: HoodieCrewType):Promise<void> => 
    new Promise((resolve, reject) => {
        setDoc(doc(firestore, "hoodieCrew", address, "tokens", token.name), token).then(() => {
            resolve()
        })
        .catch((error) => {
            reject(error)
        });
})

export const updateTokenId = (address: string, name: string, tokenId: string):Promise<void> => 
    new Promise((resolve, reject) => {
        updateDoc(doc(firestore, "hoodieCrew", address, "tokens", name), {tokenId: tokenId}).then(() => {
            resolve()
        })
        .catch((error) => {
            reject(error)
        });
})

export const getMintedTokens = (address: string):Promise<HoodieCrewType[]> => 
new Promise((resolve, reject) => {
    getDocs(collection(firestore, 'hoodieCrew', address, "tokens"))
    .then((result) => {
        let txs:HoodieCrewType[] = []
        result.docs.forEach(doc => {
            const tx = doc.data() as HoodieCrewType
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

export const getAllMintedTokens = ():Promise<HoodieCrewType[]> => 
new Promise(async (resolve) => {
    let resultArr:HoodieCrewType[] = []
    const tokens = await getDocs(collectionGroup(firestore, 'tokens'))
    console.log(tokens)
    for(const doc of tokens.docs){
        const tx = doc.data() as HoodieCrewType
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