//chatbot creation lets finally get it started section

//installs the api
//also this cost money; ik it says there is a free option for 300k credits or smth
//link below if anyone else checks
//https://console.cloud.google.com/apis/library/retail.googleapis.com?inv=1&invt=AbjRAw&project=gen-lang-client-0527470886&flow=gcp

const geminiApiKey = process.env.GEMINI_API_KEY;

export const apiConfig = {
    baseURL: URL_HERE,
    headers: {
        "Authorization": `Bearer ${geminiApiKey}`,
        "Content-Type": "application/json",
    },
};
