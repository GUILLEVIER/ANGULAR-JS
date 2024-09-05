export interface UserLogin {
  email: string;
  password: string;
}

export interface User {
  email: string;
  username: string;
  password: string;
}

export interface UserService {
  token: string;
  user: User;
  message: string;
  CodeResult: string;
}

export interface Team {
  name: string;
  showInput: boolean;
}

export type TeamKey = 'visit' | 'home';

export interface Score {
  home: number;
  visit: number;
  disabledClick: boolean;
}

export interface Fouls {
  foulsHome: number;
  foulsVisit: number;
}

export interface Timeouts {
  timeoutsHome: number;
  timeoutsVisit: number;
}

export interface ScoreServiceParams {
  scoreHome: string | number;
  scoreVisit: string | number;
  foulsHome: string | number;
  foulsVisit: string | number;
  timeoutsHome: string | number;
  timeoutsVisit: string | number;
  period: string | number;
  dateCreation: string | number;
  createdBy: string | number;
}

export interface AddScoreService {
  errors: Array<any>;
  CodeResult: string;
  message: string;
}

export interface GetScoresService {
  message: string;
  scores: Array<Score>;
  CodeResult: string;
}

export interface MessageScoreService {
  message: string;
  CodeResult: string;
}

export interface ErrorServices {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}

export interface GetScores {
  message: string;
  scores: GetScore[];
  CodeResult: string;
}

export interface GetScore {
  _id: string;
  homeTeam: string;
  visitTeam: string;
  scoreHome: number;
  scoreVisit: number;
  foulsHome: number;
  foulsVisit: number;
  timeoutsHome: number;
  timeoutsVisit: number;
  period: number;
  dateCreation: Date;
  createdBy: string;
  __v: number;
}
