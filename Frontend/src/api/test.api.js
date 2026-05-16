import api from './axios.js';

const interestQuestions = async () => {
    const res = await api.get("/test/interest-questions");
    return res.data;
}

const aptitudeQuestions = async () => {
    const res = await api.get("/test/aptitude-questions");
    return res.data
}

const submitInterestTest = async (data) => {
    const res = await api.post("/test/interest-submit", data);
    return res.data;
}

const submitAptitudeTest = async (data) => {
    const res = await api.post("/test/aptitude-submit", data);
    return res.data;
}

const getCareerRecommendations = async () => {
    const res = await api.get("/test/career-recommendations");
    return res.data;
}

export {
    interestQuestions,
    aptitudeQuestions,
    submitInterestTest,
    submitAptitudeTest,
    getCareerRecommendations,
}
