import api from "./axios";

const saveJourney = async (data) => {
    const res = await api.post("/onboarding/journey" , data);
    return res.data;
}

const saveInterests = async (data) => {
    const res = await api.post("/onboarding/interests" , data);
    return res.data;
}

const saveSkills = async (data) => {
    const res = await api.post("/onboarding/skills" , data);
    return res.data;
}

const completeOnboarding = async () => {
    const res = await api.post("/onboarding/complete");
    return res.data;
}

const onboardingStatus = async () => {
    const res = await api.get("/onboarding/status" );
    return res.data;
}

export { saveJourney , saveInterests , saveSkills , completeOnboarding , onboardingStatus }