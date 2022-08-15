

import React from 'react';
import { LensAuthContext } from '../../context/LensContext';
import { signedTypeData, getAddressFromSigner, splitSignature, getAddress } from '../services/ethers-service';
import { createPostTypedData } from './create-post-type-data';
import { lensHub } from './lens-hub';
import { v4 as uuidv4 } from 'uuid';
import { pollUntilIndexed } from '../Reffresh/has-transaction-been-indexed';
import { BigNumber, utils } from 'ethers'; 
import uploadIpfs from './ipfs'

export const createPost = async (postData) => {

 


    const profileId = window.localStorage.getItem("profileId");
    console.log(profileId, "profileId");
    // hard coded to make the code example clear


    const address = await getAddress(); 

    await postData.login(address);

    const ipfsData = JSON.stringify({
        version: '1.0.0',
        metadata_id: uuidv4(),
        description: postData.title,
        content: 'Content',
        tags: postData.tags,
        external_url: null,
        image: postData.photo,
        imageMimeType: null,
        name: null,
        attributes: [],
        media: [
        ],
        appId: 'superfun',
      });

    
    const ipfsResult = await uploadIpfs(ipfsData);  

    const createPostRequest = {
        profileId,
        contentURI: 'ipfs://' + ipfsResult.path,
        collectModule: {
            freeCollectModule: { followerOnly: true },
            // timedFeeCollectModule: {
            //     amount: {
            //        currency: "0xD40282e050723Ae26Aeb0F77022dB14470f4e011",
            //        value: "0.01"
            //      },
            //      recipient: "0xEEA0C1f5ab0159dba749Dc0BAee462E5e293daaF",
            //      referralFee: 10.5
            //  }
        },
        referenceModule: {
            followerOnlyReferenceModule: false
        }
    };



    const result = await createPostTypedData(createPostRequest); 
    const typedData = result.data.createPostTypedData.typedData;

    const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
    const { v, r, s } = splitSignature(signature); 

    const tx = await lensHub.postWithSig({
        profileId: typedData.value.profileId,
        contentURI: typedData.value.contentURI,
        collectModule: typedData.value.collectModule,
        collectModuleInitData: typedData.value.collectModuleInitData,
        referenceModule: typedData.value.referenceModule,
        referenceModuleInitData: typedData.value.referenceModuleInitData, 
        sig: {
            v,
            r,
            s,
            deadline: typedData.value.deadline,
        },
    });
    console.log(tx.hash,"has");


    const indexedResult = await pollUntilIndexed(tx.hash);

    console.log('create post: profile has been indexed', indexedResult);

    const logs = indexedResult.txReceipt.logs;

    console.log('create post: logs', logs);

    const topicId = utils.id(
        'PostCreated(uint256,uint256,string,address,bytes,address,bytes,uint256)'
    );
    console.log('topicid we care about', topicId);

    const profileCreatedLog = logs.find((l) => l.topics[0] === topicId);
    console.log('create post: created log', profileCreatedLog);

    let profileCreatedEventLog = profileCreatedLog.topics;
    console.log('create post: created event logs', profileCreatedEventLog);

    const publicationId = utils.defaultAbiCoder.decode(['uint256'], profileCreatedEventLog[2])[0];

    console.log('create post: contract publication id', BigNumber.from(publicationId).toHexString());
    console.log(
        'create post: internal publication id',
        profileId + '-' + BigNumber.from(publicationId).toHexString()
    );

    return result.data;
}