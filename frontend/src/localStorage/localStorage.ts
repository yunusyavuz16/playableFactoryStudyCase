export const GET_TOKEN_LOCAL_STORAGE = () => {
  const token = localStorage.getItem("accessToken");
  return token;
};

export const SET_TOKEN_LOCAL_STORAGE = (token: string) => {
  localStorage.setItem("accessToken", token);
};


export const CLEAR_LOCAL_STORAGE = () => {
  localStorage.clear();
}