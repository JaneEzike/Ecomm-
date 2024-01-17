export interface IInput {
  size: any;
  className?: string;
  isPassword?: boolean;
  fullWidth: boolean;
  LabelText: string;
  variant: any;
  onBlur: any;
  onChange: any;
  value: any;
  type: "number" | "text" | "password" | "email";
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  photo: string;
  _id: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GenericResponse {
  status: string;
  message: string;
}

export interface ILoginResponse {
  status: string;
  access_token: string;
}

export interface IUserResponse {
  status: string;
  data: {
    user: IUser;
  };
}
