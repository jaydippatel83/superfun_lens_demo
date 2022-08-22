 
import { loginSS } from '../login/user-login';
import { lensHub } from '../post/lens-hub';
import { getAddressFromSigner, signedTypeData, splitSignature } from '../services/ethers-service';
import { createFollowTypedData } from './create-follow-typed-data';
 

export const follow = async (profileId) => {
    const address = getAddressFromSigner();
    console.log('follow: address', address);
  
    await profileId.login(address);
  
    // hard coded to make the code example clear
    const followRequest = [
      {
         profile: profileId.id,
      } 
    ];
  
    const result = await createFollowTypedData(followRequest);
    console.log('follow: result', result);
  
    const typedData = result.data.createFollowTypedData.typedData;
    console.log('follow: typedData', typedData);
  
    const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
    console.log('follow: signature', signature);
  
    const { v, r, s } = splitSignature(signature);
  
    const tx = await lensHub.followWithSig({
      follower: getAddressFromSigner(),
      profileIds: typedData.value.profileIds,
      datas: typedData.value.datas,
      sig: {
        v,
        r,
        s,
        deadline: typedData.value.deadline,
      },
    });
    console.log('follow: tx hash', tx.hash);
    return tx.hash;
  };