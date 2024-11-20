import React, { useState, useEffect, useContext } from "react";
import Logincontain from "../containers/loginContainer";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";
import songContext from "../contexts/songContexts";

const Home = () => {
    const [songs, setSongs] = useState([]); // State to store songs
    const [loading, setLoading] = useState(true); // State for loading indicator
    const { setCurrentSong } = useContext(songContext); // Access the song context

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await makeAuthenticatedGETRequest("/song/get/allsongs");
                setSongs(response.data); // Update state with fetched songs
            } catch (error) {
                console.error("Error fetching songs:", error);
            } finally {
                setLoading(false); // Stop the loading spinner
            }
        };

        fetchSongs();
    }, []); // Empty dependency array means this runs once on mount

    return (
        <Logincontain curActiveScreen={"home"} className="overflow-auto">
            {loading ? (
                <div className="text-white">Loading songs...</div>
            ) : (
                <PlaylistView
                    titleText="All Songs"
                    cardsData={songs}
                    onCardClick={(song) => setCurrentSong(song)} // Set the clicked song
                />
            )}
        </Logincontain>
    );
};

const PlaylistView = ({ titleText, cardsData, onCardClick }) => {
    return (
        <div className="text-white mt-8">
            <div className="text-2xl font-semibold mb-5">{titleText}</div>
            <div className="flex flex-wrap justify-between gap-4">
                {/* Create a responsive flex container */}
                {cardsData.map((item) => (
                    <Card
                        key={item._id} // Ensure unique key for each card
                        title={item.name}
                        imgUrl={item.thumbnail}
                        onClick={() => onCardClick(item)} // Pass song details
                    />
                ))}
            </div>
        </div>
    );
};

const Card = ({ title, imgUrl, onClick }) => {
    return (
        <div
            className="bg-black bg-opacity-40 p-4 rounded-lg cursor-pointer hover:bg-opacity-60 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
            onClick={onClick} // Handle click to play the song
        >
            <div className="relative w-full">
                {/* Image Container */}
                <img className="w-full h-auto rounded-md" src={imgUrl} alt={title} />
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white p-1 text-center text-sm font-semibold rounded-b-md">
                    {/* Title at the bottom of the image */}
                    {title}
                </div>
            </div>
        </div>
    );
};



export default Home;
