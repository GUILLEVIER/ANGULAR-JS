export interface User {
  username: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserAdd extends User {
  name: string;
}

export interface UserService {
  token: string;
  user: User;
  message: string;
  CodeResult: string;
}

export interface AddUserResponse {
  message: string;
  CodeResult: string;
  errors: object[];
}

export interface LoginUserResponse {
  errors: object[];
  CodeResult: string;
  message: string;
  token: string;
  user: object;
}

export interface ErrorServices {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}

export const UserToken = {
  user: {
    username: '',
  },
};
