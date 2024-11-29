import "./output.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import LoginComponent from "./routes/login";
import SignupComponent from "./routes/signup";
import HomeComponent from "./routes/home";
import LoginHomeComponent from "./routes/loginhome";
import UploadSong from "./routes/uploadsong";
import MyMusic from "./routes/mymusic";
import songContexts from "./contexts/songContexts";
import SearchPage from "./routes/searchPage";
import { useCookies } from "react-cookie";

import { useState } from "react";



function App() {

  const [currentSong,setCurrentSong]=useState(null);
  const [soundPlayed,setSoundPlayed]=useState(null);
    const [isPaused,setIsPaused]=useState(true);
    const [volume, setVolume] = useState(0.15);

  const [cookie,setCookie]=useCookies(["token"]);


  return (
    <div className="w-screen h-screen font-poppins">
      <BrowserRouter>
      { cookie.token ?
      // login 
      (
          <songContexts.Provider value={{currentSong,setCurrentSong,soundPlayed,setSoundPlayed,isPaused,setIsPaused,volume,setVolume}}>
        <Routes>
          <Route path="/home" element={<LoginHomeComponent/>}/>
          <Route path="/uploadSong" element={<UploadSong />} />
          <Route path="/myMusic" element={<MyMusic/>}/>
          <Route path="/search" element={<SearchPage/>}/>
          <Route path="*" element={<Navigate to="/home"/>}/>
          </Routes>
      </songContexts.Provider>
      ):
      // logged out 
      (<Routes>
          
        
          <Route path="/login" element={<LoginComponent/>}/>
          <Route path="/signup" element={<SignupComponent/>}/>
          <Route path="/home" element={<HomeComponent/>}/>
          <Route path="*" element={<Navigate to="/login"/>}/>

      
      </Routes>)

      
        }
      </BrowserRouter>
    </div>
  );
}

const HelloComponent = () =>{
  return <div>This is from hellocomponent</div>
}

export default App;
