import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { User, userDataEntry } from '@/scripts/interfaces'
const SERVER_URL = /*"http://192.168.18.12:8000"*/"https://uvfit.azurewebsites.net"


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
        if (res.ok) {
            const data = await res.json();

            if (data.access_token) {
                setItem(data.access_token);
                return true
            }
        } else {
            console.log(res.statusText)
            return false
        }

    } catch (err: Error | any) {
        console.error("ERROR: ", err)
        console.log(
            "errorsito"
        )
        return false
    }
}

export const register_request = async (user: User) => {
    try {
        const send = await fetch(SERVER_URL + "/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        });
        const res = await send.json()
        return res
    } catch (err) {
        console.log("ERROR: ", err)
        return 0
    }
}

export const set_name_request = async (name: String) => {
    const {getItem} = useAsyncStorage('Token')
    const token = await getItem()
    const send = await fetch(SERVER_URL + "/update-name", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+ token
        },
        body : JSON.stringify({name: name})
    });
}

export const update_user_data = async({name = null,
                                      age = null,
                                      height = null,
                                      weight = null,
                                      gender = null,
                                      activity = null,
                                      laydowntime = null,
                                      isNew = null}: any = {}) => {
    const {getItem, removeItem} = useAsyncStorage('Token')
    const token = await getItem()
    const send = await fetch(SERVER_URL + "/update-userdata", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
            name: name,
            age: age,
            height: height,
            weight: weight,
            gender: gender,
            activity: activity,
            laydowntime: laydowntime,
            isNew : isNew
        })
    });
    
    const res = await send.json();
    const status = send.status;

    if (status == 401) {
        removeItem()
    }

    return {res, status}
}

export const get_user_data = async() => {
    const {getItem, removeItem} = useAsyncStorage('Token');
    const token = await getItem();
    const send = await fetch(SERVER_URL + "/get-userdata", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    });
    
    const res: userDataEntry = await send.json();
    const status = send.status;
    if (status === 401) {
        console.error("ERROR 401")
        await removeItem()
    }

    
    return {res, status}
}

export const verify_login_status= async() => {
    const {getItem, removeItem} = useAsyncStorage('Token');
    const token = await getItem();
    const send = await fetch(SERVER_URL + "/verify-login-status", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    });
    
    const res: userDataEntry = await send.json();
    const status = send.status;
    if (status === 401) {
        await removeItem()
        return false;
    }

    
    return true;
}
