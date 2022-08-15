import { apolloClient } from '../services/Apollo_Client';
import { gql } from '@apollo/client'

const GET_PROFILES = `
query($request: ProfileQueryRequest!) {
  profiles(request: $request) {
    items {
      id
      name
      bio
      attributes {
        displayType
        traitType
        key
        value
      }
              followNftAddress
      metadata
      isDefault
      picture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
        __typename
      }
      handle
      coverPicture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
        __typename
      }
      ownedBy
      dispatcher {
        address
        canUseRelay
      }
      stats {
        totalFollowers
        totalFollowing
        totalPosts
        totalComments
        totalMirrors
        totalPublications
        totalCollects
      }
      followModule {
        ... on FeeFollowModuleSettings {
          type
          amount {
            asset {
              symbol
              name
              decimals
              address
            }
            value
          }
          recipient
        }
        ... on ProfileFollowModuleSettings {
         type
        }
        ... on RevertFollowModuleSettings {
         type
        }
      }
    }
    pageInfo {
      prev
      next
      totalCount
    }
  }
}
`;

const getProfileRequest = (request) => {
  return apolloClient.query({
    query: gql(GET_PROFILES),
    variables: {
      request,
    },
  });
};

 

export const profile = async (profileHandle) => {
  console.log(profileHandle,"profileHandle");
  const request = { handle: profileHandle };
  console.log(request,"request ff");
  const profile = await getProfileRequest(request);
  console.log(profile,"profile");
  return profile;
}; 

export const profileByAddress = async (address) => { 
  const request = {ownedBy: [address] }; 
  const profile = await getProfileRequest(request);
  console.log(profile,"profile");
  const pId = profile.data.profiles.items[0];
  return pId;
}; 
 