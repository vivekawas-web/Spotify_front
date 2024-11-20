import { useContext } from "react";

import songContexts from "../../contexts/songContexts";

const SingleSongCard =({info, playSound})=>{

    const {currentSong,setCurrentSong}= useContext(songContexts);

   

    return ( <div className="flex hover:bg-gray-500 hover:bg-opacity-20 p-2 rounded-md" onClick={()=>{setCurrentSong(info);}}>
        <div className="w-12 h-12 bg-cover bg-center" style={{
            backgroundImage:`url("${info.thumbnail}")`,
        }}>

        </div>
        <div className="flex w-full">
        <div className="text-white flex justify-center flex-col pl-3 w-5/6">
            <div className="cursor-pointer hover:underline">
                {info.name}
            </div>
            <div className="text-xs text-gray-400">
                { "Uploded by: "+info.artist.firstName + " "+ info.artist.lastName}
                
            </div>
        </div>
            <div className="w-1/6 flex items-center justify-center text-gray-400 text-sm">
                <div></div>
                {/*<div className="text-gray-400 text-lg flex items-center justify-center pl-3">...</div>*/}
            </div>
        
    </div>
    </div>);
}

export default SingleSongCard;


