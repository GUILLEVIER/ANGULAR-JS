export interface User {
  username: string;
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
