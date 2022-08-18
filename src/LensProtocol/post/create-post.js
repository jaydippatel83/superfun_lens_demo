

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
    // hard coded to make the code example clear


    const address = await getAddress();

    await postData.login(address);

    const ipfsData = JSON.stringify({
        version: '1.0.0',
        metadata_id: uuidv4(),
        description: postData.title,
        content:  postData.title, 
        external_url: null,
        image:  null,
        imageMimeType: null,
        name: postData.name,
        attributes: [
            {
              traitType: 'string',
              key: 'type',
              value: 'post'
            }
          ],
        mainContentFocus: 'IMAGE',
        media: [ 
            {
                item: postData.photo,
                type: 'image/jpeg'
            }
        ],
        appId: 'superfun',
        animation_url: null,
    });
 
    // const aas = { "version": "1.0.0",
    //  "metadata_id": "73a16764-771c-4c1c-82d7-b84244512eed", 
    //  "description": "Testing post created by me ", 
    //  "content": "Testing post created by me ",
    //   "external_url": null, "image": null,
    //    "imageMimeType": null, "name": "post by @",
    //     "attributes": [],
    //      "media": [{ "item": "https://ipfs.moralis.io:2053/ipfs/QmS6s5uLgHqWbuxDjRaHn9nTn2vri1ps3jZrRY6yrbWvmf", "type": "video/mp4" }], "animation_url": "https://ipfs.moralis.io:2053/ipfs/QmS6s5uLgHqWbuxDjRaHn9nTn2vri1ps3jZrRY6yrbWvmf", "appId": "pax423" }
 

    const ipfsResult = await uploadIpfs(ipfsData);

    console.log(ipfsResult, "ipfsResult");
    // https://superfun.infura-ipfs.io/ipfs/' + ipfsResult.path

    const createPostRequest = {
        profileId,
        contentURI: `https://superfun.infura-ipfs.io/ipfs/${ipfsResult.path}`,
        // contentURI:' https://ipfs.moralis.io:2053/ipfs/QmSdfobB3pLSEFoFE4GPZT9qtFcPstxCTjt64vUKuHftFR',
        collectModule: {
            freeCollectModule: { followerOnly: true }, 
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
    console.log(tx.hash, "has");


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