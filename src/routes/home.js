import IconText from "../components/share/icontext";
import { Icon } from "@iconify/react";
import TextWithHover from "../components/share/text_with_hover";
import spotify_logo from "../assets/image/spotify_logo_white.svg";
import { useNavigate } from "react-router-dom";

const focusCardsData = [
    {
        title: "The IDOL",
        description: "We all crave things that aren't good for us. Listen to music from the HBO Original series",
        imgUrl: "https://i1.sndcdn.com/artworks-SjSp0qLXxj1i-0-t240x240.jpg",
    },
    {
        title: "Deep Focus",
        description: "Keep calm and focus with this music",
        imgUrl: "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1766&q=80",
    },
    {
        title: "Instrumental Study",
        description: "Focus with soft study music in the background.",
        imgUrl: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    },
    {
        title: "Focus Flow",
        description: "Up tempo instrumental hip hop beats",
        imgUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    },
    {
        title: "Beats to think to",
        description: "Focus with deep techno and tech house",
        imgUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    },
];

const Home = () => {
    const navigate = useNavigate(); // useNavigate hook for navigation
    return (
        <div className="h-full w-full flex">
            {/* Left Panel */}
            <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
                <div>
                    {/* Logo */}
                    <div className="logoDiv p-6">
                        <img src={spotify_logo} alt="spotify logo" width={125} />
                    </div>
                    <div className="py-5">
                        <IconText iconName={"material-symbols:home"} displayText={"Home"} active />
                        <IconText iconName={"material-symbols:search-rounded"} displayText={"Search"} />
                        <IconText iconName={"icomoon-free:books"} displayText={"Library"} />
                    </div>
                    <div className="pt-5">
                        <IconText iconName={"material-symbols:add-box"} displayText={"Create Playlist"} />
                        <IconText iconName={"mdi:cards-heart"} displayText={"Liked Songs"} />
                    </div>
                </div>
                <div className="px-5">
                    <div className="border border-gray-100 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer">
                        <Icon icon="carbon:earth-europe-africa" />
                        <div className="ml-2 text-sm font-semibold">English</div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="h-full w-4/5 bg-app-black overflow-auto">
                <div className="navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end">
                    <div className="w-1/2 flex h-full">
                        <div className="w-3/5 flex justify-around items-center">
                            <TextWithHover displayText={"Premium"} />
                            <TextWithHover displayText={"Support"} />
                            <TextWithHover displayText={"Download"} />
                            <div className="h-1/2 border-r border-white"></div>
                        </div>
                        <div className="w-2/5 flex justify-around h-full items-center">
                            <TextWithHover displayText={"Sign up"}
                            onClick={() => navigate("/signup")} />
                            <div
                                className="bg-white h-2/3 px-8 flex items-center justify-center rounded-full font-semibold cursor-pointer"
                                onClick={() => navigate("/login")}
                            >
                                Log in
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content p-8 pt-0 overflow-auto">
                    <PlaylistView titleText="Focus" cardsData={focusCardsData} />
                    <PlaylistView titleText="Spotify Playlists" cardsData={focusCardsData} />
                    <PlaylistView titleText="Sound of India" cardsData={focusCardsData} />
                </div>
            </div>
        </div>
    );
};

const PlaylistView = ({ titleText, cardsData }) => (
    <div className="text-white mt-8">
        <div className="text-2xl font-semibold mb-5">{titleText}</div>
        <div className="w-full flex justify-between space-x-4">
            {cardsData.map((item, index) => (
                <Card
                    key={index}
                    title={item.title}
                    description={item.description}
                    imgUrl={item.imgUrl}
                />
            ))}
        </div>
    </div>
);

const Card = ({ title, description, imgUrl }) => (
    <div className="bg-black bg-opacity-40 w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-4 rounded-lg hover:shadow-lg transition-all duration-200">
        <div className="pb-4 pt-2">
            <img className="w-full rounded-md" src={imgUrl} alt="label" />
        </div>
        <div className="text-white font-semibold py-3">{title}</div>
        <div className="text-gray-500 text-sm">{description}</div>
    </div>
);

export default Home;
