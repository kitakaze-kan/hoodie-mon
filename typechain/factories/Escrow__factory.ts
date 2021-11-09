/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Escrow, EscrowInterface } from "../Escrow";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "agent",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "issueDate",
        type: "uint256",
      },
    ],
    name: "EscrowIssued",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "agent",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum Escrow.TransactionStatus",
        name: "status",
        type: "uint8",
      },
    ],
    name: "PaymentCompletion",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "agent",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "PaymentCreation",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "agent",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "PaymentDispute",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "AgentLedger",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "BuyerLedger",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "Funds",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "SellerLedger",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "TransactionLedger",
    outputs: [
      {
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        internalType: "address",
        name: "agent",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "escrowFee",
        type: "uint256",
      },
      {
        internalType: "enum Escrow.TransactionStatus",
        name: "status",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "link",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "issueDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "dueDate",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "agentFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_seller",
        type: "address",
      },
      {
        internalType: "address",
        name: "_agent",
        type: "address",
      },
      {
        internalType: "string",
        name: "_link",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_dueDate",
        type: "uint256",
      },
    ],
    name: "createEscrow",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getAgentLedgerLength",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getBuyerLedger",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getSellerLedger",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "txid",
        type: "uint256",
      },
    ],
    name: "getTransaction",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "buyer",
            type: "address",
          },
          {
            internalType: "address",
            name: "seller",
            type: "address",
          },
          {
            internalType: "address",
            name: "agent",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "escrowFee",
            type: "uint256",
          },
          {
            internalType: "enum Escrow.TransactionStatus",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "link",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "issueDate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "dueDate",
            type: "uint256",
          },
        ],
        internalType: "struct Escrow.Transaction",
        name: "transaction",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTransactionLength",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getbuyerLedgerLength",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getsellerLedgerLength",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "raiseDispute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "refundBuyer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "releaseFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
    ],
    name: "setEscrowFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405260016002553480156200001657600080fd5b50620000376200002b6200003d60201b60201c565b6200004560201b60201c565b62000109565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b612d6a80620001196000396000f3fe6080604052600436106101355760003560e01c806343764960116100ab5780639196b2291161006f5780639196b22914610438578063a5c1674e14610463578063ae8e01221461048c578063e723b104146104c9578063f28d7b8914610506578063f2fde38b1461054357610135565b806343764960146103535780634d68282f14610390578063715018a6146103b957806381df2e9e146103d05780638da5cb5b1461040d57610135565b80632cd65827116100fd5780632cd658271461025f5780632e60e8901461029c57806333ea3dc8146102b857806334a4cb8f146102f557806339292763146103205780633ccfd60b1461034957610135565b806314081e391461013a57806317ec07ab146101635780631b418687146101a05780631bb9772e146101dd5780632a1b27f514610222575b600080fd5b34801561014657600080fd5b50610161600480360381019061015c919061244c565b61056c565b005b34801561016f57600080fd5b5061018a60048036038101906101859190612410565b610583565b60405161019791906127f5565b60405180910390f35b3480156101ac57600080fd5b506101c760048036038101906101c2919061236c565b6105b4565b6040516101d491906127f5565b60405180910390f35b3480156101e957600080fd5b5061020460048036038101906101ff919061244c565b610600565b604051610219999897969594939291906126dd565b60405180910390f35b34801561022e57600080fd5b506102496004803603810190610244919061236c565b610753565b60405161025691906127f5565b60405180910390f35b34801561026b57600080fd5b506102866004803603810190610281919061236c565b61079f565b60405161029391906127f5565b60405180910390f35b6102b660048036038101906102b19190612395565b6107eb565b005b3480156102c457600080fd5b506102df60048036038101906102da919061244c565b610c91565b6040516102ec91906127d3565b60405180910390f35b34801561030157600080fd5b5061030a610f37565b60405161031791906127f5565b60405180910390f35b34801561032c57600080fd5b506103476004803603810190610342919061244c565b610f3d565b005b6103516113ac565b005b34801561035f57600080fd5b5061037a60048036038101906103759190612410565b6114cd565b60405161038791906127f5565b60405180910390f35b34801561039c57600080fd5b506103b760048036038101906103b2919061244c565b6114fe565b005b3480156103c557600080fd5b506103ce61196d565b005b3480156103dc57600080fd5b506103f760048036038101906103f29190612410565b6119f5565b60405161040491906127f5565b60405180910390f35b34801561041957600080fd5b50610422611a26565b60405161042f91906126c2565b60405180910390f35b34801561044457600080fd5b5061044d611a4f565b60405161045a91906127f5565b60405180910390f35b34801561046f57600080fd5b5061048a6004803603810190610485919061244c565b611a5c565b005b34801561049857600080fd5b506104b360048036038101906104ae919061236c565b611d31565b6040516104c09190612771565b60405180910390f35b3480156104d557600080fd5b506104f060048036038101906104eb919061236c565b611e4d565b6040516104fd9190612771565b60405180910390f35b34801561051257600080fd5b5061052d6004803603810190610528919061236c565b611f69565b60405161053a91906127f5565b60405180910390f35b34801561054f57600080fd5b5061056a6004803603810190610565919061236c565b611f81565b005b6032811061057957600080fd5b8060028190555050565b6005602052816000526040600020818154811061059f57600080fd5b90600052602060002001600091509150505481565b6000600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805490509050919050565b6001818154811061061057600080fd5b90600052602060002090600902016000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060030154908060040154908060050160009054906101000a900460ff16908060060180546106c490612b1b565b80601f01602080910402602001604051908101604052809291908181526020018280546106f090612b1b565b801561073d5780601f106107125761010080835404028352916020019161073d565b820191906000526020600020905b81548152906001019060200180831161072057829003601f168201915b5050505050908060070154908060080154905089565b6000600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805490509050919050565b6000600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805490509050919050565b600034116107f857600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141561083157600080fd5b600061083f34600254612079565b9050600061084e82606461208f565b905060006040518061012001604052803373ffffffffffffffffffffffffffffffffffffffff1681526020018873ffffffffffffffffffffffffffffffffffffffff1681526020018773ffffffffffffffffffffffffffffffffffffffff16815260200183346108be9190612a44565b815260200183815260200160006003811115610903577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b8152602001868152602001428152602001858152509050600181908060018154018082558091505060019003906000526020600020906009020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550606082015181600301556080820151816004015560a08201518160050160006101000a81548160ff02191690836003811115610a80577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b021790555060c0820151816006019080519060200190610aa1929190612171565b5060e082015181600701556101008201518160080155505060006001610ac5611a4f565b610acf9190612a44565b9050600460008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819080600181540180825580915050600190039060005260206000200160009091909190915055600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819080600181540180825580915050600190039060005260206000200160009091909190915055600560008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190806001815401808255809150506001900390600052602060002001600090919091909150558673ffffffffffffffffffffffffffffffffffffffff168873ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fa78698d7cd0d784e0e9943e3d259de0c4cd8d6fd1b160fbac3af31b0758272b084348760e00151604051610c7f93929190612870565b60405180910390a45050505050505050565b610c996121f7565b60018281548110610cd3577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000209060090201604051806101200160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016002820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160038201548152602001600482015481526020016005820160009054906101000a900460ff166003811115610e4e577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b6003811115610e86577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b8152602001600682018054610e9a90612b1b565b80601f0160208091040260200160405190810160405280929190818152602001828054610ec690612b1b565b8015610f135780601f10610ee857610100808354040283529160200191610f13565b820191906000526020600020905b815481529060010190602001808311610ef657829003601f168201915b50505050508152602001600782015481526020016008820154815250509050919050565b60025481565b600060018281548110610f79577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b906000526020600020906009020190503373ffffffffffffffffffffffffffffffffffffffff168160010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16148061103657503373ffffffffffffffffffffffffffffffffffffffff168160020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16145b61103f57600080fd5b60006003811115611079577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b8160050160009054906101000a900460ff1660038111156110c3577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b148061114f5750600380811115611103577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b8160050160009054906101000a900460ff16600381111561114d577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b145b61115857600080fd5b60028160050160006101000a81548160ff021916908360038111156111a6577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b02179055508060030154600660008360000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546112229190612963565b925050819055508060040154600660008360020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546112a09190612963565b925050819055508060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168160010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168260000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f872a476beb34a78929f2590a596375c7755971ea5d892bab2377777e6d87ffd68585600301548660050160009054906101000a900460ff166040516113a093929190612839565b60405180910390a45050565b6000600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490506000600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f1935050505015801561147b573d6000803e3d6000fd5b503373ffffffffffffffffffffffffffffffffffffffff167f884edad9ce6fa2440d8a54cc123490eb96d2768479d49ff9c7366125a9424364826040516114c291906127f5565b60405180910390a250565b600460205281600052604060002081815481106114e957600080fd5b90600052602060002001600091509150505481565b60006001828154811061153a577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b906000526020600020906009020190503373ffffffffffffffffffffffffffffffffffffffff168160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614806115f757503373ffffffffffffffffffffffffffffffffffffffff168160020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16145b61160057600080fd5b6000600381111561163a577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b8160050160009054906101000a900460ff166003811115611684577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b148061171057506003808111156116c4577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b8160050160009054906101000a900460ff16600381111561170e577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b145b61171957600080fd5b60018160050160006101000a81548160ff02191690836003811115611767577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b02179055508060030154600660008360010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546117e39190612963565b925050819055508060040154600660008360020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546118619190612963565b925050819055508060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168160010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168260000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f872a476beb34a78929f2590a596375c7755971ea5d892bab2377777e6d87ffd68585600301548660050160009054906101000a900460ff1660405161196193929190612839565b60405180910390a45050565b6119756120a5565b73ffffffffffffffffffffffffffffffffffffffff16611993611a26565b73ffffffffffffffffffffffffffffffffffffffff16146119e9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016119e0906127b3565b60405180910390fd5b6119f360006120ad565b565b60036020528160005260406000208181548110611a1157600080fd5b90600052602060002001600091509150505481565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000600180549050905090565b600060018281548110611a98577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b906000526020600020906009020190503373ffffffffffffffffffffffffffffffffffffffff168160010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161480611b5557503373ffffffffffffffffffffffffffffffffffffffff168160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16145b611b5e57600080fd5b60006003811115611b98577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b8160050160009054906101000a900460ff166003811115611be2577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b14611bec57600080fd5b60038160050160006101000a81548160ff02191690836003811115611c3a577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b02179055508060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168160010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168260000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f209e456eade2ea352dffd7799d6b8188b3741d401bab2be98ff36b566dd73966858560030154604051611d25929190612810565b60405180910390a45050565b60606000611d3e83610753565b905060008167ffffffffffffffff811115611d82577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051908082528060200260200182016040528015611db05781602001602082028036833780820191505090505b509050600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805480602002602001604051908101604052809291908181526020018280548015611e3c57602002820191906000526020600020905b815481526020019060010190808311611e28575b505050505090508092505050919050565b60606000611e5a836105b4565b905060008167ffffffffffffffff811115611e9e577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051908082528060200260200182016040528015611ecc5781602001602082028036833780820191505090505b509050600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805480602002602001604051908101604052809291908181526020018280548015611f5857602002820191906000526020600020905b815481526020019060010190808311611f44575b505050505090508092505050919050565b60066020528060005260406000206000915090505481565b611f896120a5565b73ffffffffffffffffffffffffffffffffffffffff16611fa7611a26565b73ffffffffffffffffffffffffffffffffffffffff1614611ffd576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611ff4906127b3565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561206d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161206490612793565b60405180910390fd5b612076816120ad565b50565b6000818361208791906129ea565b905092915050565b6000818361209d91906129b9565b905092915050565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b82805461217d90612b1b565b90600052602060002090601f01602090048101928261219f57600085556121e6565b82601f106121b857805160ff19168380011785556121e6565b828001600101855582156121e6579182015b828111156121e55782518255916020019190600101906121ca565b5b5090506121f391906122bd565b5090565b604051806101200160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff1681526020016000815260200160008152602001600060038111156122a2577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b81526020016060815260200160008152602001600081525090565b5b808211156122d65760008160009055506001016122be565b5090565b60006122ed6122e8846128cc565b6128a7565b90508281526020810184848401111561230557600080fd5b612310848285612ad9565b509392505050565b60008135905061232781612d06565b92915050565b600082601f83011261233e57600080fd5b813561234e8482602086016122da565b91505092915050565b60008135905061236681612d1d565b92915050565b60006020828403121561237e57600080fd5b600061238c84828501612318565b91505092915050565b600080600080608085870312156123ab57600080fd5b60006123b987828801612318565b94505060206123ca87828801612318565b935050604085013567ffffffffffffffff8111156123e757600080fd5b6123f38782880161232d565b925050606061240487828801612357565b91505092959194509250565b6000806040838503121561242357600080fd5b600061243185828601612318565b925050602061244285828601612357565b9150509250929050565b60006020828403121561245e57600080fd5b600061246c84828501612357565b91505092915050565b600061248183836126a4565b60208301905092915050565b61249681612a78565b82525050565b6124a581612a78565b82525050565b60006124b68261290d565b6124c08185612930565b93506124cb836128fd565b8060005b838110156124fc5781516124e38882612475565b97506124ee83612923565b9250506001810190506124cf565b5085935050505092915050565b61251281612ac7565b82525050565b61252181612ac7565b82525050565b600061253282612918565b61253c8185612941565b935061254c818560208601612ae8565b61255581612c69565b840191505092915050565b600061256b82612918565b6125758185612952565b9350612585818560208601612ae8565b61258e81612c69565b840191505092915050565b60006125a6602683612952565b91506125b182612c7a565b604082019050919050565b60006125c9602083612952565b91506125d482612cc9565b602082019050919050565b6000610120830160008301516125f8600086018261248d565b50602083015161260b602086018261248d565b50604083015161261e604086018261248d565b50606083015161263160608601826126a4565b50608083015161264460808601826126a4565b5060a083015161265760a0860182612509565b5060c083015184820360c086015261266f8282612527565b91505060e083015161268460e08601826126a4565b506101008301516126996101008601826126a4565b508091505092915050565b6126ad81612abd565b82525050565b6126bc81612abd565b82525050565b60006020820190506126d7600083018461249c565b92915050565b6000610120820190506126f3600083018c61249c565b612700602083018b61249c565b61270d604083018a61249c565b61271a60608301896126b3565b61272760808301886126b3565b61273460a0830187612518565b81810360c08301526127468186612560565b905061275560e08301856126b3565b6127636101008301846126b3565b9a9950505050505050505050565b6000602082019050818103600083015261278b81846124ab565b905092915050565b600060208201905081810360008301526127ac81612599565b9050919050565b600060208201905081810360008301526127cc816125bc565b9050919050565b600060208201905081810360008301526127ed81846125df565b905092915050565b600060208201905061280a60008301846126b3565b92915050565b600060408201905061282560008301856126b3565b61283260208301846126b3565b9392505050565b600060608201905061284e60008301866126b3565b61285b60208301856126b3565b6128686040830184612518565b949350505050565b600060608201905061288560008301866126b3565b61289260208301856126b3565b61289f60408301846126b3565b949350505050565b60006128b16128c2565b90506128bd8282612b4d565b919050565b6000604051905090565b600067ffffffffffffffff8211156128e7576128e6612c3a565b5b6128f082612c69565b9050602081019050919050565b6000819050602082019050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600061296e82612abd565b915061297983612abd565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156129ae576129ad612b7e565b5b828201905092915050565b60006129c482612abd565b91506129cf83612abd565b9250826129df576129de612bad565b5b828204905092915050565b60006129f582612abd565b9150612a0083612abd565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615612a3957612a38612b7e565b5b828202905092915050565b6000612a4f82612abd565b9150612a5a83612abd565b925082821015612a6d57612a6c612b7e565b5b828203905092915050565b6000612a8382612a9d565b9050919050565b6000819050612a9882612cf2565b919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b6000612ad282612a8a565b9050919050565b82818337600083830152505050565b60005b83811015612b06578082015181840152602081019050612aeb565b83811115612b15576000848401525b50505050565b60006002820490506001821680612b3357607f821691505b60208210811415612b4757612b46612c0b565b5b50919050565b612b5682612c69565b810181811067ffffffffffffffff82111715612b7557612b74612c3a565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b60048110612d0357612d02612bdc565b5b50565b612d0f81612a78565b8114612d1a57600080fd5b50565b612d2681612abd565b8114612d3157600080fd5b5056fea26469706673582212203f80bcc0be984f6b26071e555a399c6f1291ab58ce065bc213c5843eec9c967064736f6c63430008040033";

export class Escrow__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Escrow> {
    return super.deploy(overrides || {}) as Promise<Escrow>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Escrow {
    return super.attach(address) as Escrow;
  }
  connect(signer: Signer): Escrow__factory {
    return super.connect(signer) as Escrow__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): EscrowInterface {
    return new utils.Interface(_abi) as EscrowInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Escrow {
    return new Contract(address, _abi, signerOrProvider) as Escrow;
  }
}
