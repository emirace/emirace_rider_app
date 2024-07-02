// Define your user type, replace 'any' with your actual user type
export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  image: string;
  email: string;
  isEmailVerified: boolean;
  phone: string;
  isPhoneVerified: boolean;
  address: string;
  dateOfBirth: string;
  isAddressVerified: boolean;
  idCard: string;
  isIdVerified: boolean;
  password: string;
  isTwoFactorEnabled: boolean;
  role: "Admin" | "User";
  bio: string;
  rating: number;
  isActive: boolean;
  createdAt: string;
  // Add more user properties as needed
};

export interface UpdateFields {
  username?: string;
  dateOfBirth?: string;
  bio?: string;
  address?: string;
  image?: string;
  isActive?: boolean;
}

export interface IVerification {
  _id?: string;
  userId?: string;
  name: string;
  file?: string[];
  status?: "APPROVED" | "DECLINED" | "PENDING" | null;
  message?: string;
  detail?: object;
}

interface UserVerify {
  image: string;
  name: {
    firstName: string;
    lastName: string;
    image: string;
  };
  email: string;
  address: {
    number: string;
    street: string;
    landmark: string;
    lga: string;
    state: string;
    image: string;
  };
}

interface Vehicle {
  image: {
    front: string;
    back: string;
    side: string;
  };
  brand: string;
  model: string;
  number: string;
  year: string;
  color: string;
}

export interface VerifyFieldState {
  user: UserVerify;
  vehicle: Vehicle;
}
