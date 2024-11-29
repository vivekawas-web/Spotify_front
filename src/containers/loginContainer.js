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

const filters = [
  { type: 'lowshelf', frequency: 60, gain: 5 },    // Boost bass
  { type: 'peaking', frequency: 150, gain: 4 },    // Slight boost at 150 Hz
  { type: 'peaking', frequency: 400, gain: 1 },    // Neutral at 400 Hz
  { type: 'peaking', frequency: 1000, gain: -10 }, // Cut at 1 kHz
  { type: 'peaking', frequency: 2400, gain: 3 },  // Slight cut at 2.4 kHz
  { type: 'highshelf', frequency: 15000, gain: 4 }, // Boost treble
];

const Logincontain = ({ children, curActiveScreen }) => {



  const [createPlaylistModalOpen, setCreatePlaylistModalOpen] =
  useState(false);
  const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);

  

  const navigate = useNavigate();
  const { currentSong, setCurrentSong, soundPlayed, setSoundPlayed, isPaused, setIsPaused,volume, setVolume } = useContext(songContext);
  const firstUpdate = useRef(true);


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


  let filtersApplied = false;

  const setupFilters = (sound) => {
    if (filtersApplied) return;  // Skip applying filters if they have already been applied

    const ctx = Howler.ctx; // Access the Web Audio API context
    const soundSource = sound._sounds[0]._node; // Retrieve the audio node

    if (!soundSource) {
        console.error("Sound source node is not initialized");
        return;
    }

    // Create a gain node (for volume adjustment) as the starting point of the audio graph
    const gainNode = ctx.createGain();
    gainNode.gain.value = volume; // Use the initial volume directly here

    // Connect the source to the gain node
    soundSource.connect(gainNode);

    // Set up the equalizer filters
    const equalizerFilters = filters.map(({ type, frequency, gain }) => {
        const filter = ctx.createBiquadFilter();
        filter.type = type;
        filter.frequency.value = frequency;
        filter.gain.value = gain;
        return filter;
    });

    // Chain filters: gainNode -> filters -> destination
    let prevNode = gainNode;
    equalizerFilters.forEach((filter) => {
        prevNode.connect(filter);
        prevNode = filter;
    });

    // Connect the final filter node to the Web Audio API destination (output)
    prevNode.connect(ctx.destination);

    filtersApplied = true;  // Mark filters as applied
};
  

  const changeSong = (songSrc) => {
    if (soundPlayed) {
        soundPlayed.stop(); // Stop the currently playing sound before playing the new one
    }

    // Create a new Howl instance and only apply volume during initialization
    const sound = new Howl({
        src: [songSrc],
        volume: volume,  // Set volume only during initialization
        onplay: () => {
            setupFilters(sound); // Set up the filters once the song starts playing
        },
        onend: () => {
            setTimeout(() => sound.play(), 1000);  // Replay the song after it finishes
        },
    });

    setSoundPlayed(sound);  // Save the Howl instance to state
    sound.play();  // Play the sound immediately after initialization
    setIsPaused(false);  // Ensure it's not paused
};

  

  

  const togglePlayPause = () => {
    if (!soundPlayed) return;

    if (isPaused) {
        playSound();  // Play the sound only when it's paused
        setIsPaused(false);
    } else {
        pauseSound();  // Pause the sound
        setIsPaused(true);
    }
};

const playSound = () => {
    if (soundPlayed) {
        soundPlayed.play();  // Simply play the sound without modifying the volume
    }
};

const pauseSound = () => {
    if (soundPlayed) {
        soundPlayed.pause();  // Pause without changing volume
    }
};

const handleVolumeChange = (event) => {
  const newVolume = Math.min(Math.max(event.target.value, 0), 0.4);  // Clamp volume between 0 and 0.4
  setVolume(newVolume);  // Update global volume state
  if (soundPlayed) {
      soundPlayed.volume(newVolume);  // Apply volume change directly to Howl instance
  }
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
              <div className="text-sx text-gray-400 hover:underline cursor-pointer">{"Uploaded by "+currentSong.artist.firstName + " " + currentSong.artist.lastName}</div>
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
                max=".4"
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
