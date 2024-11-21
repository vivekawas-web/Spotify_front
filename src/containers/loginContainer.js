import { Icon } from "@iconify/react";
import { useContext, useState, useLayoutEffect, useRef, useEffect } from "react";
import { Howl, Howler } from 'howler';
import songContext from "../contexts/songContexts";
import { useNavigate } from "react-router-dom";
import spotify_logo from "../assets/image/spotify_logo_white.svg";
import IconText from "../components/share/icontext";
import TextWithHover from "../components/share/text_with_hover";

import CreatePlaylistModal from "../models/CreatePlaylistModal";

import AddToPlaylistModal from "../models/add_playlist";



const Logincontain = ({ children, curActiveScreen }) => {



  const [createPlaylistModalOpen, setCreatePlaylistModalOpen] =
  useState(false);
  const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);

  

  const navigate = useNavigate();
  const { currentSong, setCurrentSong, soundPlayed, setSoundPlayed, isPaused, setIsPaused } = useContext(songContext);
  const firstUpdate = useRef(true);

  const [volume, setVolume] = useState(1);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (!currentSong) return;
    changeSong(currentSong.track);
  }, [currentSong && currentSong.track]);

  useEffect(() => {
    if (soundPlayed) {
      soundPlayed.volume(volume); // Update volume of the sound object
    }
  }, [volume, soundPlayed]);

  const playSound = () => {
    if (!soundPlayed) return;
    soundPlayed.play();
  };

  const changeSong = (songSrc) => {
    if (soundPlayed) {
      soundPlayed.stop();
    }
  
    // Create a new Howl instance with the onend event to repeat the song
    const sound = new Howl({
      src: [songSrc],
      html5: true,
      volume,
      onend: () => {
        // Delay replaying the song by 2 seconds
        setTimeout(() => {
          sound.play();
        }, 2000);
      },
    });
  
    setSoundPlayed(sound);
    sound.play();
    setIsPaused(false);
  };
  

  

  const pauseSound = () => {
    soundPlayed.pause();
  };

  const togglePlayPause = () => {
    if (isPaused) {
      playSound();
      setIsPaused(false);
    } else {
      pauseSound();
      setIsPaused(true);
    }
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value); // Update volume state
  };

  return (
    <div className="h-full w-full bg-app-black">



         {createPlaylistModalOpen && (
                    <CreatePlaylistModal
                         closeModal={() => {
                               setCreatePlaylistModalOpen(false);
                          }}
                       />
                   )}

    
      <div className={`${currentSong ? "h-9/10" : "h-full"} w-full flex`}>
        {/* Left Panel */}
        <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
          <div className="logoDiv p-6">
            <img src={spotify_logo} alt="spotify logo" width={125} />
          </div>
          <div className="py-5">

            <IconText iconName={"material-symbols:home"} displayText={"Home"} active={curActiveScreen === "home"} targetLink={"/home"} />


            <IconText iconName={"material-symbols:search-rounded"} displayText={"Search"} active={curActiveScreen === "Search"} targetLink={"/search"} />


            <IconText iconName={"icomoon-free:books"} displayText={"Library"} active={curActiveScreen === "Library"} />


            <IconText iconName={"material-symbols:library-music-sharp"} displayText={"My Music"} targetLink={"/myMusic"} active={curActiveScreen === "myMusic"} />


          </div>
          <div className="pt-5">
            <IconText iconName={"material-symbols:add-box"} displayText={"Create Playlist"}
             onClick={() => {
              setCreatePlaylistModalOpen(true);
          }}
             />


            <IconText iconName={"mdi:cards-heart"} displayText={"Liked Songs"} />


          </div>
          <div className="px-5">
            <div className="border border-gray-100 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer">
              <Icon icon="carbon:earth-europe-africa" />
              <div className="ml-2 text-sm font-semibold">English</div>
            </div>
          </div>
        </div>

        {/* Right Panel (Main Content) */}
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
                <TextWithHover displayText={"Upload Song"} onClick={() => navigate("/uploadSong")} className="cursor-pointer" />
                <div className="bg-white w-10 h-10 flex items-center justify-center rounded-full font-semibold cursor-pointer">VS</div>
              </div>
            </div>
          </div>
          <div className="content p-8 pt-0 overflow-auto">{children}</div>
        </div>
      </div>

      {/* Bottom Player Controls */}
      {currentSong && (
        <div className="w-full h-1/10 bg-black bg-opacity-30 text-white flex items-center px-4">
          <div className="w-1/4 flex items-center">
            <img src={currentSong.thumbnail} className="h-14 w-14 rounded" />
            <div className="pl-4">
              <div className="text-sm hover:underline cursor-pointer ">{currentSong.name}</div>
              <div className="text-sx text-gray-400 hover:underline cursor-pointer">{currentSong.artist.firstName + " " + currentSong.artist.lastName}</div>
            </div>
          </div>
          <div className="w-1/2 flex justify-center h-full flex-col items-center">
            <div className="flex w-1/3 justify-between items-center">
              <Icon icon="ph:shuffle-fill" fontSize={30} className="cursor-pointer text-gray-500 hover:text-gray-100" />
              <Icon icon="mdi:skip-previous-outline" fontSize={30} className="cursor-pointer text-gray-500 hover:text-gray-100" />
              <Icon
                icon={isPaused ? "ic:baseline-play-circle" : "ic:baseline-pause-circle"}
                fontSize={50}
                className="cursor-pointer text-gray-500 hover:text-gray-100"
                onClick={togglePlayPause}
              />
              <Icon icon="mdi:skip-next-outline" fontSize={30} className="cursor-pointer text-gray-500 hover:text-gray-100"/>
              <Icon icon="ic:twotone-repeat" fontSize={30} className="cursor-pointer text-gray-500 hover:text-gray-100" />
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center justify-center space-x-1 ">
            {/* Sound Icon */}
            <div className="w-1/6 flex items-end justify-end mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="45" height="25" viewBox="0 0 16 16" className="text-white">
                <path fill="none" stroke="currentColor" d="M12.7 12.243a6 6 0 0 0 0-8.486m-2.079 6.364a3 3 0 0 0 0-4.242M2.5 5.5H5l3.5-3v11l-3.5-3H2.5z" />
              </svg>
            </div>

            {/* Volume Control Slider */}
            <div className="w-3/4">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-2 bg-gray-600 rounded-full appearance-none cursor-pointer"
                style={{ WebkitAppearance: "none", appearance: "none" }}
              />
            </div>

            {/* Custom Thumb Style */}
            <style jsx>{`
              input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 16px;
                height: 16px;
                background-color: red;
                border-radius: 50%;
                cursor: pointer;
              }

              input[type="range"]::-moz-range-thumb {
                width: 16px;
                height: 16px;
                background-color: red;
                border-radius: 50%;
                cursor: pointer;
              }

              input[type="range"]::-ms-thumb {
                width: 16px;
                height: 16px;
                background-color: red;
                border-radius: 50%;
                cursor: pointer;
              }
            `}</style>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logincontain;
