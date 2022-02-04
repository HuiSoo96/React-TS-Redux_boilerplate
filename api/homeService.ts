import axios from 'axios'

const API_URL = "http://localhost:4001/api"

export const HomeInfoList = (data: any) => {
    const homeInfo = axios.post(API_URL + '/board/home/infoList', {data})

    return homeInfo
}