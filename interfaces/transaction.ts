export enum TransactionStatus { EscrowIssued, FundsReleased, Refunded, AwaitingResolution, DraftIssued, Delivered }

export type TransactionType = {
  txId: number,
  buyer: string,
  seller: string,
  agent: string,
  value: string,
  escrowFee: string,
  status: TransactionStatus,
  link: string,
  issueDate: string,
  dueDate: string
}

export type TransactionTypeWithId = {
    id: string
    buyer: string,
    seller: string,
    agent: string,
    value: string,
    escrowFee: string,
    status: TransactionStatus,
    link: string,
    issueDate: string,
    dueDate: string
  }