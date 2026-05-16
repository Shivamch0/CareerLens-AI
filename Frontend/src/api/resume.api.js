import api from "./axios";

const getLatestResume = async () => {
  const res = await api.get("/resume/latest");
  return res.data;
};

const saveResume = async (generatedResume) => {
  const res = await api.post("/resume/save", { generatedResume });
  return res.data;
};

const uploadResume = async (file, onUploadProgress) => {
  const formData = new FormData();
  formData.append("resume", file);

  const res = await api.post("/resume/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });

  return res.data;
};

const analyzeResume = async ({ resumeText, targetRole }) => {
  const res = await api.post("/resume/analyze", {
    resumeText,
    targetRole,
  });

  return res.data;
};

export { getLatestResume, saveResume, uploadResume, analyzeResume };
