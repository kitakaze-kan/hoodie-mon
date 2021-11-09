import { firestore } from '../app'
import type { TransactionType, TransactionTypeWithId } from '../../../interfaces'
import { TransactionStatus }  from '../../../interfaces'
import { collection,  getDoc, addDoc,setDoc, doc, updateDoc, getDocs, query, where } from 'firebase/firestore/lite'

export const createDraftEscrow = (address: string, tx: TransactionType):Promise<string> => 
    new Promise((resolve, reject) => {
        addDoc(collection(firestore, 'users', address, 'transactions'), tx).then((result) => {
            const docId = result.id
            setDoc(doc(firestore, "escrows", docId), tx)
            .then(() => {
                resolve(docId)
            })
        })
        .catch((error) => {
            reject(error)
        });
})

export const getDraftEscrow = (id: string):Promise<TransactionType> => 
    new Promise((resolve, reject) => {
        getDoc(doc(firestore, "escrows", id))
        .then((result) => {
            const tx = result.data() as TransactionType
            resolve(tx)
        })
        .catch((error) => {
            reject(error)
        });
})

export const getDraftEscrows = (address: string,):Promise<TransactionTypeWithId[]> => 
    new Promise((resolve, reject) => {
        const q = query(collection(firestore, 'users', address, 'transactions'), where("status", "==", TransactionStatus.DraftIssued));
        getDocs(q)
        .then((result) => {
            const txs:TransactionTypeWithId[] = []
            result.docs.forEach(doc => {
                const tx = doc.data() as TransactionType
                const txWithId:TransactionTypeWithId = {id: doc.id, ...tx}
                txs.push(txWithId)
            })
            resolve(txs)
        })
        .catch((error) => {
            reject(error)
        });
})

export const updateStatus = (address: string, id: string, status: TransactionStatus):Promise<string> => 
    new Promise((resolve, reject) => {
        updateDoc(doc(firestore, "escrows", id), {status: status})
        .then(() => {
            updateDoc(doc(firestore, 'users', address, 'transactions', id), {status: status}).then(() => {
                resolve(id)
            })            
        })
        .catch((error) => {
            reject(error)
        });
})