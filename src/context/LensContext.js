import React, { useState, createContext, useEffect, useCallback } from "react";

import { profileById } from "./query";


import jwt_decode from "jwt-decode";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { apolloClient } from "../LensProtocol/services/Apollo_Client";
import { gql } from "urql";
import { signText, getAddress } from "../LensProtocol/services/ethers-service";
import { profile, profileByAddress } from "../LensProtocol/profile/get-profile";
import { db } from "../firebase/firebase";
import Web3Modal from 'web3modal';
import { posts } from "../LensProtocol/post/get-post";
import { getPublicationByLatest } from "../LensProtocol/post/explore/explore-publications";

export const LensAuthContext = createContext(undefined);

export const LensAuthContextProvider = (props) => {

  const options = {};

  const web3Modal = new Web3Modal({
    network: "mumbai",
    cacheProvider: true,
    options,
  });

  const [userAdd, setUserAdd] = useState("");
  const [profile, setProfile] = useState("");
  const [update, setUpdate] = useState(false);
  const [userPosts, setUserPosts] = useState(false);


  useEffect(() => {
    async function getWalletAddress() {
      if (window.ethereum) {
        const accounts = await window.ethereum?.request({
          method: "eth_requestAccounts",
        });
        setUserAdd(accounts[0]);
        window.localStorage.setItem("connectorId", "injected");
      }
    }
    getWalletAddress()
  }, [update])

  const id = window.localStorage.getItem("profileId");


  useEffect(() => {
    async function getProfile() {
      if (id !== null) {
        const user = await profileById(id);
       
        setProfile(user);
      }

    };
    getProfile();
    getPosts();
  }, [userAdd, update]);


  async function getPosts() {
    const post = await posts(id); 
    const data = await getPublicationByLatest();
    console.log(data,"data by latest");
    setUserPosts(data.data.explorePublications.items); 
  }




  const AUTHENTICATION = `
  mutation($request: SignedAuthChallenge!) { 
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
 }
`;

  const authenticate = (address, signature) => {
    return apolloClient.mutate({
      mutation: gql(AUTHENTICATION),
      variables: {
        request: {
          address,
          signature,
        },
      },
    });
  };

  const GET_CHALLENGE = `
  query($request: ChallengeRequest!) {
    challenge(request: $request) { text }
  }
`;

  const generateChallenge = (address) => {
    return apolloClient.query({
      query: gql(GET_CHALLENGE),
      variables: {
        request: {
          address,
        },
      },
    });
  };

  const REFRESH_AUTHENTICATION = `
  mutation($request: RefreshRequest!) { 
    refresh(request: $request) {
      accessToken
      refreshToken
    }
 }
`;

  const refreshAuth = (refreshToken) => {
    return apolloClient.mutate({
      mutation: gql(REFRESH_AUTHENTICATION),
      variables: {
        request: {
          refreshToken,
        },
      },
    });
  };

  const refresh = async () => {
    const refreshToken = window.localStorage.getItem("refreshToken");
    const accessToken = window.localStorage.getItem("accessToken");

    if (accessToken === null || accessToken === "undefined") {
      return false;
    }

    let decodedRefresh = jwt_decode(refreshToken);
    let decodedAccess = jwt_decode(accessToken);

    console.log("JWT", decodedAccess, decodedRefresh);
    //Check if the accessToken is expired or not
    if (decodedAccess.exp > Date.now() / 1000) {
      return true;
    }

    //Check if the RefreshToken is valid, if yes we refresh them.
    if (decodedRefresh.exp > Date.now() / 1000) {
      try {
        const newAccessToken = await refreshAuth(
          refreshToken
        );
        window.localStorage.setItem("accessToken", newAccessToken.data.refresh.accessToken);
        window.localStorage.setItem("refreshToken", newAccessToken.data.refresh.refreshToken);
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    }

    //If both "if" failed, we return false to request a new challenge in login()
    return false;
  };


  function disconnectWallet() {
    web3Modal.clearCachedProvider();
    window.localStorage.removeItem("accessToken");
    window.localStorage.removeItem("refreshToken");
    window.localStorage.removeItem("profileId");
    setUpdate(!update)
    window.location.reload();

  }



  const login = async () => {

    const address = await getAddress();
    const isTokenValid = await refresh();
    if (isTokenValid) {
      console.log("login: already logged in");
      return;
    }
    const challengeResponse = await generateChallenge(address);
    const signature = await signText(challengeResponse.data.challenge.text);
    const accessTokens = await authenticate(address, signature);
    const profiles = await profileByAddress(address);
    console.log(profiles, "profiles");
    window.localStorage.setItem("profileId", profiles?.id);
    setUpdate(!update)

   

    // const q = query(collection(db, "profiles"), where("handle", "==", profiles.handle)); 
    // const querySnapshot = await getDocs(q); 
    const q = query(collection(db, "profiles"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((e) => { 

      // if (e.data().id === profiles?.id) {
      //   console.log("exist");
      // } else if(e.data().id !== profiles?.id) {
      //   const docRef = addDoc(collection(db, "profiles"), {
      //     bio: profiles.bio,
      //     coverPicture: profiles.coverPicture,
      //     handle: profiles.handle,
      //     name: profiles.name,
      //     id: profiles.id,
      //     metadata: profiles.metadata,
      //     ownedBy: profiles.ownedBy,
      //     photo: profiles.picture ? profiles.picture.original.url : null,
      //   });
      // }
    })
     
    window.localStorage.setItem("accessToken", accessTokens.data.authenticate.accessToken);
    window.localStorage.setItem("refreshToken", accessTokens.data.authenticate.refreshToken);

  };


  const loginCreate = async () => {

    const address = await getAddress();
    const isTokenValid = await refresh();
    if (isTokenValid) {
      console.log("login: already logged in");
      return;
    }
    const challengeResponse = await generateChallenge(address);
    const signature = await signText(challengeResponse.data.challenge.text);
    const accessTokens = await authenticate(address, signature);  
    window.localStorage.setItem("accessToken", accessTokens.data.authenticate.accessToken);
    window.localStorage.setItem("refreshToken", accessTokens.data.authenticate.refreshToken);

  };


  return (
    <LensAuthContext.Provider
      value={{
        userAdd,
        profile,
        login,
        update,
        disconnectWallet,
        userPosts,
        setUpdate,
        loginCreate
      }}
      {...props}
    >
      {props.children}
    </LensAuthContext.Provider>
  );
}