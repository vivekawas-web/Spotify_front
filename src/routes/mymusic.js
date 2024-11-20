

import SingleSongCard from "../components/share/singlesongcard";
import {makeAuthenticatedGETRequest} from "../utils/serverHelper";
import { useState , useEffect } from "react";

import Logincontain from "../containers/loginContainer";

const MyMusic=()=>{
    const [songData,setSongData]=useState([]);
    useEffect(()=>{
        const getData= async ()=>{
            const response= await makeAuthenticatedGETRequest("/song/get/mysongs");
            setSongData(response.data);
        };
        getData();
     },[]);
    return(
        <Logincontain curActiveScreen={"myMusic"}>
            <div className="text-white text-xl font-semibold pb-4 pl-2 pt-8" >My Songs</div>
                    <div className="space-y-3 overflow-auto">
                    {songData.map((item)=>{
                        return <SingleSongCard info={item}
                        playSound={()=>{}} />
                    })}
                    </div>
        </Logincontain>
    )
}



  




export default MyMusic;