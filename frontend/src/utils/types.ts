export type UserRole = "USER" | "ADMIN";

export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
};

export type SignupRequest = {
  email:string;
  password: string;
  firstName: string;
  lastName: string;
};

export type PredictionRequestDto = {
  age: number;
  weight: number;
  height: number;
  hba1cLevel: number;
  bloodGlucoseLevel: number;
  smokingHistory: number;
};

export type Prediction = {
  id: number;
  prediction: number;
  probability: number;
  createdAt: string;
};

export type PagedPredictions = {
  content: Prediction[];
  totalPages: number;
  totalElements: number;
  number: number;
};

export type UpdateUserRequest = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
};


export type PagedUsers = {
  content: User[];
  totalPages: number;
  totalElements: number;
  number: number;
};