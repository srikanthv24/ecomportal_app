import auth_services from "../services/auth_services";

export class RefreshToken {
  static getRefreshedToken = async () => {
    let token = "";
    const lastRefreshTime = localStorage.getItem('expiry-time');
    token = localStorage.getItem('token');
    if(lastRefreshTime && token) {
      const currentTime = Date.now();
      const diffInMin = (currentTime - lastRefreshTime) / 1000 /60;
      if (diffInMin >= 5) {
        const newToken = await auth_services.getUserToken();
        token = newToken.accessToken.jwtToken;
        localStorage.setItem('expiry-time', Date.now());
      }
    }
    return token;
  }
} 