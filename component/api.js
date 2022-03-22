import Config from "react-native-config";

const isDev = Config.NODE_ENV === 'development';
const host = isDev ? "192.168.0.102" : "18.176.33.224";
const schema = "http://";
const port = "8080"
const url = schema + host + ":" + port;
const apiKey = Config.API_KEY;

export const CreatePage = async (isbn) => {
    try {
        if (isDev) {
            console.log(url, apiKey, Config)
        }
        const response = await fetch(url + "/book/create", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
            },
            body: JSON.stringify({
                isbn: isbn
            })
        })
        if (isDev) {
            console.log(response)
        }
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}