import { ethers } from 'ethers';
import { LENS_HUB_ABI, LENS_HUB_CONTRACT_ADDRESS } from '../abi/abi';
import { getSigner } from '../services/ethers-service'; 

export const lensHub = new ethers.Contract(
  LENS_HUB_CONTRACT_ADDRESS,
  LENS_HUB_ABI,
  getSigner()
)