import axios from 'axios'

const API_URL = "http://localhost:4001/api"

export const BoardContentList = async (data: any) => {
    const boardList = await axios.post(API_URL + "/board/lists", {data})

    return boardList
}

export const BoardContentCreate = async (data: any) => {
    let config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const boardCreate = await axios.post(API_URL + "/board/create", data, config)

    return boardCreate
}

export const BoardContentdUpdate = async (data: any) => {
    const boardUpdate = await axios.post(API_URL + "/board/update", data)

    return boardUpdate
}

export const BoardContentRead = async (data: any) => {
    let config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const boardRead = await axios.post(API_URL + "/board/read", data, config)

    return boardRead
}

export const BoardContentDelete = async (data: any) => {
    const boardDelete = await axios.post(API_URL + "/board/delete", data)
    
    return boardDelete
}