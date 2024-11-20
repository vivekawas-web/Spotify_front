import { useState, useEffect } from "react";
import Logincontain from "../containers/loginContainer";
import { Icon } from "@iconify/react";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";
import SingleSongCard from "../components/share/singlesongcard";

const SearchPage = () => {
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [songData, setSongData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Debounce search input
    useEffect(() => {
        if (searchText.trim()) {
            const timer = setTimeout(() => {
                searchSong();
            }, 500); // Wait 500ms before triggering the search API
            return () => clearTimeout(timer); // Cleanup timeout
        }
    }, [searchText]);

    const searchSong = async () => {
        setLoading(true);
        setError(null);
        try {
            // Send the search text to the backend for fuzzy matching
            const response = await makeAuthenticatedGETRequest(
                `/song/get/songname/${searchText}` // Backend supports fuzzy search
            );
    
            // Update the song data with the response
            setSongData(response.data);
        } catch (err) {
            console.error("Error fetching song data:", err);
    
            // Set error message for UI feedback
            setError("Something went wrong while fetching songs. Please try again.");
        } finally {
            setLoading(false); // Stop the loading spinner
        }
    };

    return (
        <Logincontain curActiveScreen={"Search"}>
            <div className="w-full py-6">
                {/* Search bar */}
                <div
                    className={`w-1/3 p-3 text-sm rounded-full bg-black px-5 flex text-white space-x-3 items-center ${
                        isInputFocused ? "border border-white" : ""
                    }`}
                >
                    <Icon icon="ic:outline-search" className="text-lg" />
                    <input
                        type="text"
                        placeholder="What do you want to listen to?"
                        className="w-full bg-black focus:outline-none"
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>

                {/* Loading Indicator */}
                {loading && (
                    <div className="text-gray-400 pt-10">Searching for songs...</div>
                )}

                {/* Error Message */}
                {error && <div className="text-red-500 pt-10">{error}</div>}

                {/* Song List */}
                {!loading && songData.length > 0 ? (
                    <div className="pt-10 space-y-3">
                        <div className="text-white">
                            Showing search results for
                            <span className="font-bold"> {searchText}</span>
                        </div>
                        {songData.map((item) => (
                            <SingleSongCard
                                info={item}
                                key={item.id || JSON.stringify(item)} // Use a stable unique key
                                playSound={() => {}}
                            />
                        ))}
                    </div>
                ) : (
                    !loading &&
                    !error && (
                        <div className="text-gray-400 pt-10">
                            {searchText
                                ? "No songs found for your search."
                                : "Nothing to show here."}
                        </div>
                    )
                )}
            </div>
        </Logincontain>
    );
};

export default SearchPage;
