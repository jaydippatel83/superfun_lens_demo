import { apolloClient } from '../services/Apollo_Client';
// this is showing you how you use it with react for example
// if your using node or something else you can import using
// @apollo/client/core!
import { gql } from '@apollo/client'
import { getAddressFromSigner } from '../services/ethers-service';
// import { login } from '../Login-user';
import { BigNumber, utils } from "ethers";
import { loginSS} from '../login/user-login';
import { pollUntilIndexed } from '../Reffresh/has-transaction-been-indexed';

const CREATE_PROFILE = `
  mutation($request: CreateProfileRequest!) { 
    createProfile(request: $request) {
      ... on RelayerResult {
        txHash
      }
      ... on RelayError {
        reason
      }
            __typename
    }
 }
`

export const createProfileRequest = (createProfileRequest) => {
   return apolloClient.mutate({
    mutation: gql(CREATE_PROFILE),
    variables: {
      request: createProfileRequest
    },
  })
}


const createProfile = async (handleInput) => { 
  if (!handleInput) {
    throw new Error("handleInput is undefined");
  }
  const address = getAddressFromSigner();

  await handleInput.login(handleInput.address);

  const createProfileResult = await createProfileRequest({
    handle: handleInput.handle,
    profilePictureUri: handleInput.url,   
    followModule: {
         freeFollowModule: true
      }
  });
 


  if (createProfileResult?.data.createProfile.__typename === "RelayError") {
    alert(`Error when creating a profile: ${createProfileResult?.data.createProfile.reason}`);
    return false;
  }

  console.log("create profile: poll until indexed",createProfileResult.data.createProfile.txHash);
  const result = await pollUntilIndexed(createProfileResult.data.createProfile.txHash)
  console.log("create profile: profile has been indexed", result);

  const logs = result.txReceipt.logs;

  const topicId = utils.id(
    "ProfileCreated(uint256,address,address,string,string,address,bytes,string,uint256)"
  );
  console.log(topicId,"topicId");

  const profileCreatedLog = logs.find((l) => l.topics[0] === topicId);

  let profileCreatedEventLog = profileCreatedLog.topics;

  const profileId = utils.defaultAbiCoder.decode(["uint256"], profileCreatedEventLog[1])[0];
  console.log(profileId,"profileId");

  window.localStorage.setItem("profileId", BigNumber.from(profileId).toHexString());

  return result;
};

export default createProfile;


