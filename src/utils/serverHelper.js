import { backendUrl } from "./config.js";

export const makeUnauthenticatedPOSTRequest = async (route, body) => {
    const response = await fetch(backendUrl + route, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    const formattedResponse = await response.json();
    return formattedResponse;
};



export const makeAuthenticatedPOSTRequest = async (route, body) => {
    const token = getToken();
    if (!token) {
        throw new Error("Authentication token is missing or expired.");
    }

    try {
        const response = await fetch(backendUrl + route, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });

        // Check if the response is OK
        if (!response.ok) {
            const errorResponse = await response.text(); // Use .text() to capture non-JSON error response
            throw new Error(`Error: ${response.status}, ${errorResponse}`);
        }

        // Parse JSON if response is OK
        const formattedResponse = await response.json();
        return formattedResponse;
    } catch (error) {
        console.error("Request failed:", error.message);
        throw error; // Re-throw for upstream handling
    }
};

const getToken = () => {
    const accessToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    if (!accessToken) {
        throw new Error("Token is missing or expired");
    }
    return accessToken;
};