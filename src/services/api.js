import axios from "axios";

let instance;

export default function api() {
    return instance || axios;
}


export function initApi(token) {
    instance = axios.create({
        headers: {
            "x-token": token,
        },
        
    })
}