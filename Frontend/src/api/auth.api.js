import api from './axios.js';

const registerUser = async(data) => {
    const res = await api.post("/users/register" , data)
    return res.data
}

export {registerUser}