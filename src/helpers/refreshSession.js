import auth_services from "../services/auth_services";

export class RefreshToken {
  static getRefreshedToken = async () => {
    const lastRefreshTime = localStorage.getItem('expiry-time');
    const currentTime = Date.now();
    const diffInMin = (currentTime - lastRefreshTime) / 1000 /60;
    let token = localStorage.getItem('token');
    if (diffInMin >= 5) {
      const newToken = await auth_services.getUserToken();
      token = newToken.accessToken.jwtToken;
      localStorage.setItem('expiry-time', Date.now());
      debugger;
    }
    return token;
  }
} 