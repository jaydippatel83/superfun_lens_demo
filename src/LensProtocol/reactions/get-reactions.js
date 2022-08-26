import { gql } from "urql"
import { apolloClient } from "../services/Apollo_Client"


const GET_REACTIONS = `
 query Publications($publicationsRequest: PublicationsQueryRequest!, $reactionRequest: ReactionFieldResolverRequest) {
    publications(request: $publicationsRequest) {
      items {
        __typename 
        ... on Post {
          reaction(request: $reactionRequest)
        }
        ... on Comment {
          reaction(request: $reactionRequest)
        }
        ... on Mirror {
          reaction(request: $reactionRequest)
        }
      }
      pageInfo {
        prev
        next
        totalCount
      }
    }
  } 
`



export const getReactiionReq = (data) => {
    // console.log(profilesRequest, "profilesRequest");
    return apolloClient.mutate({
        mutation: gql(GET_REACTIONS),
        variables: {
            publicationsRequest: {
                "profileId": data.pid,
                "publicationTypes": ["POST", "COMMENT", "MIRROR"],
            },
            reactionRequest: {
                "profileId": data.pid2
            },
        }
    })
}

export const getLikes = async (data) => { 
    const res = await getReactiionReq(data); 
    return res.data;
}