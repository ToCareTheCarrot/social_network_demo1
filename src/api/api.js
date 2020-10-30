import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {'API-KEY' : '9ff6fb7c-3ad5-4d19-8437-95e6781bc7f0'}
});

export const usersAPI = {
  getUsers(currentPage, pageSize) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
  },
  unfollowUser(userId) {
    return instance.delete(`follow/${userId}`)
  },
  followUser(userId) {
    return instance.post(`follow/${userId}`,{})
  },
}

export const profileAPI = {
  getProfileData(userId) {
    return instance.get(`profile/${userId}`)
  },
  getStatus(userId) {
    return instance.get(`profile/status/${userId}`)
  },
  updateStatus(status){
    return instance.put(`profile/status/`, {status: status})
  }
}

export const authAPI = {
  authMe() {
    return instance.get(`auth/me`);
  },
  loginMe(email, password, rememberMe = false) {
    return instance.post(`auth/login`, { email, password, rememberMe });
  },
  logoutMe() {
    return instance.delete(`auth/login`);
  }
}



