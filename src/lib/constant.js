export const ENVObj = {
  VITE_APPWRITE_PROJECT_ID: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  VITE_APPWRITE_PROJECT_NAME: import.meta.env.VITE_APPWRITE_PROJECT_NAME,
  VITE_APPWRITE_ENDPOINT: import.meta.env.VITE_APPWRITE_ENDPOINT
};

console.log(import.meta.env);
console.log(ENVObj);
