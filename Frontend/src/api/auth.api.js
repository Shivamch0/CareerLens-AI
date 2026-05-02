import api from './axios.js';

const registerUser = async(data) => {
    const res = await api.post("/users/register" , data)
    return res.data
}

const loginUser = async (data) => {
    const res = await api.post("/users/login" , data);
    return res.data;
}

const logoutUser = async (data) => {
    const res = await api.post("/users/logout" , data)
    return res.data
}

const refreshToken = async () => {
    const res = await api.post("/users/refresh-token" , )
}

export {registerUser , loginUser}