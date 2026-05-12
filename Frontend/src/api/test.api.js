import api from './axios.js';

const interestQuestions = async () => {
    const res = await api.get("/test/interest-questions");
    return res.data;
}

const aptitudeQuestions = async () => {
    const res = await api.get("/test/aptitude-questions");
    return res.data
}

const submitInterestTest = async (answers) => {
    const res = await api.post("/test/interest-submit", { answers });
    return res.data;
}

const submitAptitudeTest = async ({ answers, questions }) => {
    const res = await api.post("/test/aptitude-submit", { answers, questions });
    return res.data;
}

export {
    interestQuestions,
    aptitudeQuestions,
    submitInterestTest,
    submitAptitudeTest,
}
