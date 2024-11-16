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
import { useCookies } from "react-cookie";

function App() {
  const [cookie,setCookie]=useCookies(["token"]);


  return (
    <div className="w-screen h-screen font-poppins">
      <BrowserRouter>
      { cookie.token ?
      // login 
      (<Routes>
          
        
          <Route path="/home" element={<LoginHomeComponent/>}/>
          <Route path="/uploadSong" element={<UploadSong/>}/>
          <Route path="*" element={<Navigate to="/home"/>}/>

      
      </Routes>):
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
