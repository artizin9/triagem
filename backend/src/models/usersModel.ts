export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role?: string

  }
  
  export interface RegisterUserInput {
    name: string;
    email: string;
    password: string;

  }
  
  export interface LoginUserInput {
    email: string;
    password: string;

  }
  