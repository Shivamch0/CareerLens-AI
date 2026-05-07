import api from './axios.js';

const interestQuestions = async () => {
    const res = await api.get("/test/interest-questions");
    return res.data;
}

const aptitudeQuestions = async () => {
    const res = await api.get("/test/aptitude-questions");
    return res.data
}

export { interestQuestions , aptitudeQuestions }