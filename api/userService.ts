import axios from 'axios'

const API_URL = "http://localhost:4001/api"

export const IDCheck = async (id: string) => {
    const data = await axios.get("http://localhost:4001/api/users/idcheck", {
            params: {
                userid: id
            },
        })
    return data
}

export const LogIn = async (data: any) => {
    return await axios.post(API_URL + '/users/login', data)
}

export const Register = async (data: any) => {
    return await axios.post(API_URL + "/users/register", data)
}