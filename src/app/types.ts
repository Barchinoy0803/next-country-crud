export interface Country {
  id: string;
  name: string;
  capital: string;
  cityCount: string;
}

export interface CreateEditDialogType {
  isOpen: boolean;
  type: 'create' | 'edit';
  country?: Country;
}

export interface SendOtpType {
  email: string;
}

export interface OTPVerification {
  email: string;
  otp: string;
}

export interface RegisterForm {
  email: string;
  firstname: string;
  lastname: string;
  regionId: string;
  password: string;
  img: string;
}

export interface LoginForm {
  email: string;
  password: string;
}