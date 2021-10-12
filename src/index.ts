import * as CryptoJS from "crypto-js"

class Block {
  public id: number
  public hash: string
  public previousHash: string
  public data: string
  public timestamp: number

  static calculateBlockHash = (id: number, previousHash: string, data: string, timestamp: number): string =>
    CryptoJS.SHA256(id + previousHash + data + timestamp).toString()

  static validateStructure = (block: Block): boolean => {
    return  typeof block.id === 'number' &&
            typeof block.hash === 'string' &&
            typeof block.previousHash === 'string' &&
            typeof block.data === 'string' &&
            typeof block.timestamp === 'number'
  }

  constructor(id: number, hash: string, previousHash: string, data: string, timestamp: number) {
    this.id = id
    this.hash = hash
    this.previousHash = previousHash
    this.data = data
    this.timestamp = timestamp
  }
}

const genesisBlock: Block = new Block(0, "ABCDEF1234567890", "", "Hello", 1812)

let blockchain: Block[] = [genesisBlock]

const getBlockchain = (): Block[] => blockchain

const getLastBlock = (): Block => blockchain[blockchain.length - 1]

const getTimestamp = (): number => Math.round(new Date().getTime() / 1000)

const createNewBlock = (data: string): Block => {
  const lastBlock: Block = getLastBlock()

  const newID: number = lastBlock.id + 1
  const newTimestamp: number = getTimestamp()
  const newHash: string = Block.calculateBlockHash(newID, lastBlock.hash, data, newTimestamp)

  const newBlock: Block = new Block(newID, newHash, lastBlock.hash, data, newTimestamp)

  addBlock(newBlock)
  return newBlock
}

const getHashForBlock = (block: Block): string => {
  return Block.calculateBlockHash(block.id, block.previousHash, block.data, block.timestamp)
}

const isBlockValid = (candidateBlock: Block, lastBlock: Block): boolean => {
  if (!Block.validateStructure(candidateBlock)) {
    return false
  } else if (lastBlock.id + 1 !== candidateBlock.id) {
    return false
  } else if (lastBlock.hash !== candidateBlock.previousHash) {
    return false
  } else if (getHashForBlock(candidateBlock) !== candidateBlock.hash) {
    return false
  }
  return true
}

const addBlock = (candidateBlock: Block): void => {
  if (isBlockValid(candidateBlock, getLastBlock())) {
    blockchain.push(candidateBlock)
  }
}

createNewBlock('2nd block')
createNewBlock('3rd block')
createNewBlock('4th block')
createNewBlock('5th block')

console.log(getBlockchain())
