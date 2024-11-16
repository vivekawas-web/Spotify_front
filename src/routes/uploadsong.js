import { useState } from "react";
import IconText from "../components/share/icontext";
import {Icon} from "@iconify/react";
import TextWithHover from "../components/share/text_with_hover";
import spotify_logo from "../assets/image/spotify_logo_white.svg";
import TextInput from "../components/share/text";

import CloudinaryUpload from "../components/share/CloudinaryUpload";

import {makeAuthenticatedPOSTRequest} from "../utils/serverHelper";



const UploadSong = () => {

    const [name,setName]=useState("");
    const [thumbnail,setThumbnail]=useState("");
    const [playlistUrl,setPlaylistUrl]=useState("");
    const [uploadedSongFileName,setUploadedSongFileName]=useState();



    const submitSong = async ()=>{

        const data ={name,thumbnail,track:playlistUrl};
        try {
            const response = await makeAuthenticatedPOSTRequest("/song/create", data);
            console.log("Response:", response);  // Successfully received response
        } catch (error) {
            console.error("Failed to submit song:", error.message);  // Log error message
        }
    };

    return (
        <div className="h-full w-full flex">
            {/* This first div will be the left panel */}
            <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
                <div>
                    {/* This div is for logo */}
                    <div className="logoDiv p-6">
                        <img
                            src={spotify_logo}
                            alt="spotify logo"
                            width={125}
                        />
                    </div>
                    <div className="py-5">
                        <IconText
                            iconName={"material-symbols:home"}
                            displayText={"Home"}
                            active
                        />
                        <IconText
                            iconName={"material-symbols:search-rounded"}
                            displayText={"Search"}
                        />
                        <IconText
                            iconName={"icomoon-free:books"}
                            displayText={"Library"}
                        />
                        <IconText
                            iconName={"material-symbols:library-music-sharp"}
                            displayText={"My Music"}
                        />
                    </div>
                    <div className="pt-5">
                        <IconText
                            iconName={"material-symbols:add-box"}
                            displayText={"Create Playlist"}
                        />
                        <IconText
                            iconName={"mdi:cards-heart"}
                            displayText={"Liked Songs"}
                        />
                    </div>
                </div>
                <div className="px-5">
                    <div className="border border-gray-100 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer">
                        <Icon icon="carbon:earth-europe-africa" />
                        <div className="ml-2 text-sm font-semibold">
                            English
                        </div>
                    </div>
                </div>
            </div>
            {/* This second div will be the right part(main content) */}
            <div className="h-full w-4/5 bg-app-black overflow-auto">
                <div className="navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end">
                    <div className="w-1/2 flex h-full">
                        <div className="w-2/3 flex justify-around items-center">
                            <TextWithHover displayText={"Premium"} />
                            <TextWithHover displayText={"Support"} />
                            <TextWithHover displayText={"Download"} />
                            <div className="h-1/2 border-r border-white"></div>
                        </div>
                        <div className="w-1/3 flex justify-around h-full items-center">
                            <TextWithHover displayText={"Upload Song"} />
                            <div className="bg-white w-10 h-10 flex items-center justify-center rounded-full font-semibold cursor-pointer">
                                VS
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content p-8 pt-0 overflow-auto">
                    <div className="ml-2 text-2xl font-semibold text-white mt-8">Upload your music</div>
                    <div className="w-2/3 flex space-x-3">
                        <div className="w-1/2">
                            <TextInput label="Name" 
                            labelClassName={"text-white"}
                            placeholder={"Name"}
                            value={name}
                            setValue={setName}/>
                        </div>
                    <div className="w-1/2">
                        <TextInput label="Thumbnail" 
                        labelClassName={"text-white"}
                        placeholder={"Thumbnail"}
                        value={thumbnail}
                        setValue={setThumbnail}/>
                    </div>
                    
                    </div>
                    </div>
                    <div className="py-5">
                        {uploadedSongFileName ? (
                            <div className="bg-white rounded-full p-2 w-1/3">
                                {uploadedSongFileName.substring(0, 35)}...
                            </div>
                        ) : (
                            <CloudinaryUpload
                                setUrl={setPlaylistUrl}
                                setName={setUploadedSongFileName}
                            />
                        )}
                    </div>
                <div className="bg-white rounded-full m-5 p-2 w-40 flex items-center justify-center cursor-pointer font-semibold" onClick={submitSong}>
                    Submit song
                </div>
            </div>
        </div>
    );
};




export default UploadSong;