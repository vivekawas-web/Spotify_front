import { useState } from "react";
import TextInput from "../components/share/text";
import CloudinaryUpload from "../components/share/CloudinaryUpload";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelper";
import Logincontain from "../containers/loginContainer";
import { useNavigate } from "react-router-dom";

const UploadSong = () => {
    const [name, setName] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [playlistUrl, setPlaylistUrl] = useState("");
    const [uploadedSongFileName, setUploadedSongFileName] = useState();
    const navigate = useNavigate();

    const submitSong = async () => {
        const data = { name, thumbnail, track: playlistUrl };
        try {
            const response = await makeAuthenticatedPOSTRequest("/song/create", data);
            console.log("Response:", response);

            if (response.err) {
                alert("Could not upload the song");
            } else {
                navigate("/home");
            }
        } catch (error) {
            console.error("Failed to submit song:", error.message);
        }
    };

    return (
        <Logincontain >
            <div className="p-8">
                <div className="ml-2 text-2xl font-semibold text-white mt-8">
                    Upload your music
                </div>
                <div className="w-2/3 flex space-x-3 mt-4">
                    <div className="w-1/2">
                        <TextInput
                            label="Name"
                            labelClassName={"text-white"}
                            placeholder={"Name"}
                            value={name}
                            setValue={setName}
                        />
                    </div>
                    <div className="w-1/2">
                        <TextInput
                            label="Thumbnail"
                            labelClassName={"text-white"}
                            placeholder={"Thumbnail"}
                            value={thumbnail}
                            setValue={setThumbnail}
                        />
                    </div>
                </div>
                <div className="py-4">
                    {uploadedSongFileName ? (
                        <div className="bg-white rounded-full p-2 w-40">
                            {uploadedSongFileName.substring(0, 35)}...
                        </div>
                    ) : (
                        <CloudinaryUpload
                            setUrl={setPlaylistUrl}
                            setName={setUploadedSongFileName}
                        />
                    )}
                </div>
                <div
                    className="bg-white rounded-full p-2 w-40 flex items-center justify-center cursor-pointer font-semibold"
                    onClick={submitSong}
                >
                    Submit song
                </div>
            </div>
        </Logincontain>
    );
};

export default UploadSong;
