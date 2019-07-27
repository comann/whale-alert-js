
import fetch from 'node-fetch'


const router = {
  status: `https://api.whale-alert.io/v1/status`,
  transaction: `https://api.whale-alert.io/v1/transaction/`
}

export default class Api {
  api_key: String,

  constructor(key: String){
    this.api_key = key;
  }


  status = async (): Promise<StatusResponse> => {
    const res = await fetch(`${router.status}?api_key=${this.api_key}`, {
      method: 'GET', 
    })

    return res.json()
  }

  transaction = async(blockchainType: BlockchainType, transaction_id: string) : Promise<TransactionResponse> => {
    const res = await fetch(`${router.transaction}/${blockchainType}/${transaction_id}?api_key=${this.api_key}`, {
      method: 'GET'
    })
  }
}


export type BlockchainType = 'ripple' | 'ehereum' | 'neo' | 'stellar' | 'bitcoin' | 'tezos' | 'eos' | 'binancechain'
export type StatusResponse = {
  result: String | 'success',
  blockchain_count: Number,
  blockchains: {
    name: BlockchainType,
    status: 'connected'|string,
    symbols: []
  }[],
}

export type TransactionResponse = {
  result: string|"success",
  count: number,
  transactions: 
    {
      blockchain: BlockchainType,
      symbol: string,
      transaction_type: string|"transfer",
      hash: string,
      from: {
        address: string,
        owner?: string,
        owner_type: string
      },
      to: {
        address: string,
        owner_type: string
      },
      timestamp: number,
      amount: number,
      amount_usd: number,
      transaction_count: number
    }[]
}