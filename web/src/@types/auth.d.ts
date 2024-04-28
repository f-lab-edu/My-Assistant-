type ISignupType = {
  username: string;
  email: string;
  password: string;
  profileImage: string;
  isTestUser: boolean;
};

type IVerfiyTokenType = {
  token: string;
  isTestUser: boolean;
  email: string;
};

type ISigninType = {
  email: string;
  password: string;
};
