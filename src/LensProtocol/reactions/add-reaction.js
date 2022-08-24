
import { gql } from '@apollo/client'
import { toast } from 'react-toastify';
import { apolloClient } from '../services/Apollo_Client';
import { getAddress } from '../services/ethers-service';

const ADD_REACTION = `
  mutation($request: ReactionRequest!) { 
   addReaction(request: $request)
 }
`;


const REMOVE_REACTION = `
  mutation($request: ReactionRequest!) { 
   removeReaction(request: $request)
 }
`;

 

const addReactionRequest = (profileId, reaction, publicationId) => {
    return apolloClient.mutate({
        mutation: gql(ADD_REACTION),
        variables: {
            request: {
                profileId,
                reaction,
                publicationId,
            },
        },
    });
};

export const addReaction = async (data) => {
    const profileId = data.id;
    if (!profileId) {
        throw new Error('Must define PROFILE_ID in the .env to run this');
    }

    const address = getAddress();
    console.log('add reaction: address', address);

    await data.login(address);

    await addReactionRequest(profileId, data.react, data.publishId);
    toast.success("Success");
    console.log('add reaction: sucess');
}

const removeReactionRequest = (
    profileId,
    reaction,
    publicationId
) => {
    return apolloClient.mutate({
        mutation: gql(REMOVE_REACTION),
        variables: {
            request: {
                profileId,
                reaction,
                publicationId,
            },
        },
    });
};

export const removeReaction = async (data) => {
    const profileId = data.id;
    if (!profileId) {
        throw new Error('Must define PROFILE_ID in the .env to run this');
    }

    const address = getAddress();
    console.log('remove reaction: address', address);

    await data.login(data.address);

    await removeReactionRequest(profileId, 'UPVOTE', data.publishId);
    toast.success("Success");
    console.log('remove reaction: sucess');
};
