import { Web3Storage } from 'web3.storage';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const apiToken = process.env.REACT_APP_IPFS;
const client = new Web3Storage({ token: apiToken });

function addData(Item) {
    const blob = new Blob(
        [
            JSON.stringify(Item),
        ],
        { type: "application/json" }
    );
    const files = [
        new File([blob], "data.json"),
    ];
    return files;

}

export const uploadIpfs = async (data) => {

    const dd = await addData(data);

    const cid = await client.put(dd);

    console.log('upload result ipfs', cid);
    return cid;
};