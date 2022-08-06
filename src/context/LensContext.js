import React, { useState, createContext, useEffect, useCallback } from "react"; 
import { ethers} from "ethers";
import getProfiles from "../LensProtocol/profile/get-profiles";

export const LensAuthContext = createContext(undefined);

export const LensAuthContextProvider = (props) => {

    const [userAdd, setUserAdd]= useState(""); 
      

    useEffect( ()=>{
      async function getWalletAddress(){ 
        if(window.ethereum){
            const accounts = await window.ethereum?.request({
                method: "eth_requestAccounts",
              }); 
              setUserAdd(accounts[0]);
              window.localStorage.setItem("connectorId", "injected");
        }
      }
      getWalletAddress()
    },[])

    useEffect(() => {
        async function getProfile() {
          if (userAdd) {
            const { profiles } = await getProfiles({ ownedBy: [userAdd] });
            console.log(profiles,"profiles");
            // setProfilesLens(profiles.items);
          }
        };
        getProfile();
      }, [userAdd]);


    return (
        <LensAuthContext.Provider
            value={{
                userAdd,
            }}
            {...props}
        >
            {props.children}
        </LensAuthContext.Provider>
    );
}