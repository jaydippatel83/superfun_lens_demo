// import { signedTypeData, getAddressFromSigner, splitSignature, getSigner } from './ethers.service';
import uploadIpfs from '../../post/ipfs';
import { lensPeriphery } from '../../post/lens-hub';
import { getAddressFromSigner, signedTypeData, splitSignature } from '../../services/ethers-service';
import { createSetProfileMetadataTypedData } from './create-set-profile-metadata-typed-data';
import { v4 as uuidv4 } from 'uuid';
import { pollUntilIndexed } from '../../Reffresh/has-transaction-been-indexed';


export const setProfileMetadata = async (data) => {
    
    const profileId = data.profileId;
    if (!profileId) {
      throw new Error('Must define PROFILE_ID in the .env to run this');
    }
  
     
    await data.login(data.address);

    const ipfsData = JSON.stringify({
        name: data.name,
      bio: data.bio,
      cover_picture:  data.photo,
      attributes: [
        {
          traitType: 'string',
          value: 'yes this is custom',
          key: 'custom_field',
        },
      ],
      version: '1.0.0',
      metadata_id: uuidv4(),
    });

  
    const ipfsResult = await uploadIpfs(ipfsData);
    console.log('create profile: ipfs result', ipfsResult);
  
    // hard coded to make the code example clear
    const createProfileMetadataRequest = {
      profileId,
      metadata:`https://superfun.infura-ipfs.io/ipfs/${ipfsResult.path}`,
    };
  
    const result = await createSetProfileMetadataTypedData(
      createProfileMetadataRequest.profileId,
      createProfileMetadataRequest.metadata
    );
    console.log('create profile: createSetProfileMetadataTypedData', result);
  
    const typedData = result.data.createSetProfileMetadataTypedData.typedData;
    console.log('create profile: typedData', typedData);
  
    const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
    console.log('create profile: signature', signature);
  
    const { v, r, s } = splitSignature(signature);
  
    const tx = await lensPeriphery.setProfileMetadataURIWithSig({
      profileId: createProfileMetadataRequest.profileId,
      metadata: createProfileMetadataRequest.metadata,
      sig: {
        v,
        r,
        s,
        deadline: typedData.value.deadline,
      },
    });
    console.log('create profile metadata: tx hash', tx.hash);
  
    console.log('create profile metadata: poll until indexed');
    const indexedResult = await pollUntilIndexed(tx.hash);
  
    console.log('create profile metadata: profile has been indexed', result);
  
    const logs = indexedResult.txReceipt.logs;
  
    console.log('create profile metadata: logs', logs);
  
    return result.data;
  };
  
 

// export const setProfileMetadata = async () => {
//   const createProfileMetadataRequest = {
//     profileId: "0x1d",
//     url: "ipfs://QmSfyMcnh1wnJHrAWCBjZHapTS859oNSsuDFiAPPdAHgHP",
//   };
  
//   const result = await createSetProfileMetadataTypedData(
//     createProfileMetadataRequest.profileId,
//     createProfileMetadataRequest.metadata
//   );
//   const typedData = result.data.createSetProfileMetadataTypedData.typedData;
  
//   const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
//   const { v, r, s } = splitSignature(signature);
  
//   const tx = await lensPeriphery.setProfileMetadataURIWithSig({
//     profileId: createProfileMetadataRequest.profileId,
//     metadata: createProfileMetadataRequest.metadata,
//     sig: {
//       v,
//       r,
//       s,
//       deadline: typedData.value.deadline,
//     },
//   });
//   console.log(tx.hash);
//   // 0x64464dc0de5aac614a82dfd946fc0e17105ff6ed177b7d677ddb88ec772c52d3
//   // you can look at how to know when its been indexed here: 
//   //   - https://docs.lens.dev/docs/has-transaction-been-indexed
// }