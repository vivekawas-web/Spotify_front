import {createContext} from "react";

const songContext = createContext({
    currentSong: null,
    setCurrentSong: (currentSong) => {},
    soundPlayed: null,
    setSoundPlayed: () => {},
    isPaused: null,
    setIsPaused: () => {},
    volume: 50, // Default initial value for volume
  setVolume: () => {}, // Function to update volume
});

export default songContext;