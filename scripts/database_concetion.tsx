import { useAsyncStorage } from '@react-native-async-storage/async-storage'
const SERVER_URL = "http://192.168.18.12:8000"

export interface User {
    name: String | null
    email: String
    password: String
}

export const login_request = async (user: User) => {
    const {getItem, setItem, removeItem} = useAsyncStorage('Token')
    try {
        const res = await fetch(SERVER_URL + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        });

        const data = await res.json();

        if (data.access_token) {
            setItem(data.access_token);
            return true
        }
    } catch (err) {
        console.log("ERROR: ", err)
        return false
    }
}

export const register_request = async (user: User) => {
    const res = await fetch(SERVER_URL + "/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    });
    const data = await res.json()
    return data
}

export const set_name_request = async (name: String) => {
    const {getItem, setItem, removeItem} = useAsyncStorage('Token')
    const token = await getItem()
    const res = await fetch(SERVER_URL + "/update-name", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+ token
        },
        body : JSON.stringify({name: name})
    });
}
