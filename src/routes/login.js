import TextInput from "../components/share/text";
import PasswordInput from "../components/share/password";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelper";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const LoginComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cookies, setCookie] = useCookies(["token"]);
    const navigate = useNavigate();

    const login = async () => {

        if (!email || !password) {
            toast.error("All fields are required!");
            return;
        }

        const data = {email, password};
        const response = await makeUnauthenticatedPOSTRequest(
            "/auth/login",
            data
        );
        if (response && !response.err) {
            const token = response.token;
            const date = new Date();
            date.setDate(date.getDate() + 30);
            setCookie("token", token, {path: "/", expires: date});
            toast.success("Login successful!");
            navigate("/home");
        } else {
            toast.error(data.err || "Invalid login credentials");
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center">
        <ToastContainer />
            <div className="logo p-5 border-b border-solid border-gray-300 w-full flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="155" height="60" viewBox="0 0 512 160"><path fill="#ff0000" d="M79.655 0C35.664 0 0 35.663 0 79.654c0 43.993 35.664 79.653 79.655 79.653c43.996 0 79.656-35.66 79.656-79.653c0-43.988-35.66-79.65-79.657-79.65zm36.53 114.884a4.963 4.963 0 0 1-6.83 1.646c-18.702-11.424-42.246-14.011-69.973-7.676a4.967 4.967 0 0 1-5.944-3.738a4.96 4.96 0 0 1 3.734-5.945c30.343-6.933 56.37-3.948 77.367 8.884a4.965 4.965 0 0 1 1.645 6.83m9.75-21.689c-1.799 2.922-5.622 3.845-8.543 2.047c-21.41-13.16-54.049-16.972-79.374-9.284a6.22 6.22 0 0 1-7.75-4.138a6.22 6.22 0 0 1 4.141-7.745c28.929-8.778 64.892-4.526 89.48 10.583c2.92 1.798 3.843 5.622 2.045 8.538m.836-22.585C101.1 55.362 58.742 53.96 34.231 61.4c-3.936 1.194-8.098-1.028-9.29-4.964a7.453 7.453 0 0 1 4.965-9.294c28.137-8.542 74.912-6.892 104.469 10.655a7.44 7.44 0 0 1 2.606 10.209c-2.092 3.54-6.677 4.707-10.206 2.605zm89.944 2.922c-13.754-3.28-16.198-5.581-16.198-10.418c0-4.57 4.299-7.645 10.7-7.645c6.202 0 12.347 2.336 18.796 7.143c.19.145.437.203.675.165a.9.9 0 0 0 .6-.367l6.715-9.466a.903.903 0 0 0-.171-1.225c-7.676-6.157-16.313-9.15-26.415-9.15c-14.848 0-25.225 8.911-25.225 21.662c0 13.673 8.95 18.515 24.417 22.252c13.155 3.031 15.38 5.57 15.38 10.11c0 5.032-4.49 8.161-11.718 8.161c-8.028 0-14.582-2.71-21.906-9.046a.93.93 0 0 0-.656-.218a.9.9 0 0 0-.619.313l-7.533 8.96a.906.906 0 0 0 .086 1.256c8.522 7.61 19.004 11.624 30.323 11.624c16 0 26.339-8.742 26.339-22.277c.028-11.421-6.81-17.746-23.561-21.821zm59.792-13.564c-6.934 0-12.622 2.732-17.321 8.33V62c0-.498-.4-.903-.894-.903h-12.318a.9.9 0 0 0-.894.902v70.009c0 .494.4.903.894.903h12.318a.9.9 0 0 0 .894-.903v-22.097c4.699 5.26 10.387 7.838 17.32 7.838c12.89 0 25.94-9.92 25.94-28.886c.019-18.97-13.032-28.894-25.93-28.894zm11.614 28.893c0 9.653-5.945 16.397-14.468 16.397c-8.418 0-14.772-7.048-14.772-16.397c0-9.35 6.354-16.397 14.772-16.397c8.38 0 14.468 6.893 14.468 16.396m47.759-28.893c-16.598 0-29.601 12.78-29.601 29.1c0 16.143 12.917 28.784 29.401 28.784c16.655 0 29.696-12.736 29.696-28.991c0-16.2-12.955-28.89-29.496-28.89zm0 45.385c-8.827 0-15.485-7.096-15.485-16.497c0-9.444 6.43-16.298 15.285-16.298c8.884 0 15.58 7.093 15.58 16.504c0 9.443-6.468 16.291-15.38 16.291m64.937-44.258h-13.554V47.24c0-.497-.4-.902-.894-.902H374.05a.906.906 0 0 0-.904.902v13.855h-5.916a.9.9 0 0 0-.894.902v10.584a.9.9 0 0 0 .894.903h5.916v27.39c0 11.062 5.508 16.674 16.38 16.674c4.413 0 8.075-.914 11.528-2.873a.88.88 0 0 0 .457-.78v-10.083a.9.9 0 0 0-.428-.76a.87.87 0 0 0-.876-.039c-2.368 1.19-4.66 1.741-7.229 1.741c-3.947 0-5.716-1.798-5.716-5.812V73.49h13.554a.9.9 0 0 0 .894-.903V62.003a.873.873 0 0 0-.884-.903zm47.217.054v-1.702c0-5.006 1.921-7.238 6.22-7.238c2.57 0 4.633.51 6.945 1.28a.895.895 0 0 0 1.18-.858l-.001-10.377a.89.89 0 0 0-.637-.865c-2.435-.726-5.555-1.47-10.235-1.47c-11.367 0-17.388 6.405-17.388 18.516v2.606H428.2a.906.906 0 0 0-.904.902v10.638c0 .497.41.903.904.903h5.916v42.237c0 .504.41.904.904.904h12.308c.504 0 .904-.4.904-.904V73.487h11.5l17.616 42.234c-1.998 4.433-3.967 5.317-6.65 5.317c-2.168 0-4.46-.646-6.79-1.93a.98.98 0 0 0-.714-.067a.9.9 0 0 0-.533.485l-4.175 9.16a.9.9 0 0 0 .39 1.17c4.356 2.359 8.284 3.367 13.145 3.367c9.093 0 14.125-4.242 18.548-15.637l21.364-55.204a.88.88 0 0 0-.095-.838a.88.88 0 0 0-.733-.392h-12.822a.9.9 0 0 0-.856.605l-13.136 37.509l-14.382-37.534a.9.9 0 0 0-.837-.58h-21.04zm-27.375-.054h-12.318a.907.907 0 0 0-.903.902v53.724c0 .504.409.904.903.904h12.318c.495 0 .904-.4.904-.904v-53.72a.9.9 0 0 0-.904-.903zm-6.088-24.464c-4.88 0-8.836 3.95-8.836 8.828a8.835 8.835 0 0 0 8.836 8.836c4.88 0 8.827-3.954 8.827-8.836a8.83 8.83 0 0 0-8.827-8.828"/></svg>
            </div>
            <div className="inputRegion w-1/3 py-10 flex items-center justify-center flex-col">
                {/*  I will have my 2 inputs(email and password) and I will have my sign up instead button*/}
                <div className="font-bold mb-4">
                    To continue, log in to Spotify.
                </div>
                <TextInput
                    label="Email address or username"
                    placeholder="Email address or username"
                    className="my-6"
                    value={email}
                    setValue={setEmail}
                />
                <PasswordInput
                    label="Password"
                    placeholder="Password"
                    value={password}
                    setValue={setPassword}
                />
                <div className=" w-full flex items-center justify-end my-8">
                    <button
                    style={{ backgroundColor: '#ff0000' }}
                        className=" font-semibold p-3 px-10 rounded-full"
                        onClick={(e) => {
                            e.preventDefault();
                            login();
                        }}
                    >
                        LOG IN
                    </button>
                </div>
                <div className="w-full border border-solid border-gray-300"></div>
                <div className="my-6 font-semibold text-lg">
                    Don't have an account?
                </div>
                <div className="border border-gray-500 text-gray-500 w-full flex items-center justify-center py-4 rounded-full font-bold">
                    <Link to="/signup">SIGN UP FOR SPOTIFY</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;