const SessionManager = {
  getToken() {
    const token = sessionStorage.getItem("token");
    if (token) return token;
    else return null;
  },

  setUserSession(username: string, token: string, userId: string | number) {
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("userId", userId.toString());
  },

  removeUserSession() {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
  }
};

export default SessionManager;