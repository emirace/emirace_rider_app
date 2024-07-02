import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import {
  sendVerifyOtpService,
  verifyOtpService,
  verifyEmailService,
  sendVerifyEmailService,
  getUserService,
  updateUserService,
} from "../services/auth";
import { UpdateFields, User, VerifyFieldState } from "../type/user";
import * as SecureStore from "expo-secure-store";

interface Props {
  children?: ReactNode;
}

interface LoadingState {
  sendVerifyOtp: boolean;
  verifyOtp: boolean;
  verifyEmail: boolean;
  sendVerifyEmail: boolean;
  getUser: boolean;
  updateUser: boolean;
}

interface ErrorState {
  sendVerifyOtp: string | null;
  verifyOtp: string | null;
  verifyEmail: string | null;
  sendVerifyEmail: string | null;
  getUser: string | null;
  updateUser: string | null;
}

const initialLoadingState: LoadingState = {
  sendVerifyOtp: false,
  verifyOtp: false,
  verifyEmail: false,
  sendVerifyEmail: false,
  getUser: false,
  updateUser: false,
};

const initialErrorState: ErrorState = {
  sendVerifyOtp: null,
  verifyOtp: null,
  verifyEmail: null,
  sendVerifyEmail: null,
  getUser: null,
  updateUser: null,
};

const initialVerifyField = {
  user: {
    image: "",
    name: {
      firstName: "",
      lastName: "",
      image: "",
    },
    email: "",
    address: {
      number: "",
      street: "",
      landmark: "",
      lga: "",
      state: "Edo",
      image: "",
    },
  },
  vehicle: {
    image: {
      front: "",
      back: "",
      side: "",
    },
    brand: "",
    model: "",
    number: "",
    year: "",
    color: "",
  },
};

const AuthContext = createContext<{
  user: User | null;
  loading: LoadingState;
  error: ErrorState;
  verifyField: VerifyFieldState;
  setVerifyField: (value: any) => void;
  sendVerifyOtp: (credentials: { phone: string }) => Promise<boolean>;
  getUser: () => Promise<User | null>;
  verifyEmail: (credentials: { token: string }) => Promise<boolean>;
  sendVerifyEmail: (credentials: { phone: string }) => Promise<boolean>;
  updateUser: (userData: UpdateFields) => Promise<User | null>;
  verifyOtp: (credentials: { token: string }) => Promise<boolean>;
} | null>(null);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [verifyField, setVerifyField] =
    useState<VerifyFieldState>(initialVerifyField);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<LoadingState>(initialLoadingState);
  const [error, setError] = useState<ErrorState>(initialErrorState);

  const handleLoading = (key: keyof LoadingState, state: boolean) => {
    setLoading((prev) => ({ ...prev, [key]: state }));
  };

  const handleError = (key: keyof ErrorState, error: any) => {
    setError((prev) => ({ ...prev, [key]: error || "An error occurred." }));
  };

  const clearError = (key: keyof ErrorState) => {
    setError((prev) => ({ ...prev, [key]: null }));
  };

  const sendVerifyOtp = async (userData: { phone: string }) => {
    handleLoading("sendVerifyOtp", true);
    clearError("sendVerifyOtp");
    try {
      const response = await sendVerifyOtpService(userData);
      handleLoading("sendVerifyOtp", false);
      return !!response;
    } catch (error) {
      handleLoading("sendVerifyOtp", false);
      handleError("sendVerifyOtp", error);
      return false;
    }
  };

  const verifyOtp = async (tokenData: { token: string }) => {
    handleLoading("verifyOtp", true);
    clearError("verifyOtp");
    try {
      const response = await verifyOtpService(tokenData);
      setAuthToken(response);
      handleLoading("verifyOtp", false);
      return !!response;
    } catch (error) {
      handleLoading("verifyOtp", false);
      handleError("verifyOtp", error);
      return false;
    }
  };

  const verifyEmail = async (tokenData: { token: string }) => {
    handleLoading("verifyEmail", true);
    clearError("verifyEmail");
    try {
      const response = await verifyEmailService(tokenData);
      handleLoading("verifyEmail", false);
      return !!response;
    } catch (error) {
      handleLoading("verifyEmail", false);
      handleError("verifyEmail", error);
      return false;
    }
  };

  const sendVerifyEmail = async (userData: { phone: string }) => {
    handleLoading("sendVerifyEmail", true);
    clearError("sendVerifyEmail");
    try {
      const response = await sendVerifyEmailService(userData);
      handleLoading("sendVerifyEmail", false);
      return !!response;
    } catch (error) {
      handleLoading("sendVerifyEmail", false);
      handleError("sendVerifyEmail", error);
      return false;
    }
  };

  const getUser = async () => {
    handleLoading("getUser", true);
    clearError("getUser");
    try {
      const authenticatedUser = await getUserService();
      if (authenticatedUser) {
        setUser(authenticatedUser);
        handleLoading("getUser", false);
        return authenticatedUser;
      }
      handleLoading("getUser", false);
      return null;
    } catch (error) {
      handleLoading("getUser", false);
      handleError("getUser", error);
      return null;
    }
  };

  const updateUser = async (userData: UpdateFields) => {
    handleLoading("updateUser", true);
    clearError("updateUser");
    try {
      const updatedUser = await updateUserService(userData);
      if (updatedUser) {
        setUser(updatedUser);
        handleLoading("updateUser", false);
        return updatedUser;
      }
      handleLoading("updateUser", false);
      return null;
    } catch (error) {
      handleLoading("updateUser", false);
      handleError("updateUser", error);
      return null;
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      const token = await SecureStore.getItemAsync("authToken");
      const savedToken = authToken || token;
      if (savedToken) {
        await getUser();
      }
    };
    checkUser();
  }, [authToken]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        verifyField,
        setVerifyField,
        sendVerifyEmail,
        verifyEmail,
        sendVerifyOtp,
        verifyOtp,
        getUser,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
