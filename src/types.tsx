export interface AcceptedResponseType {
  response: {
    status: number;
    statusMsg: string;
    time: string;
    data: Array<{
      ID: number;
      UserName: string;
      PasswdHash: string;
      PermLevel: number;
    }>;
  };
  success: boolean;
}
export enum VerificationStatus {
  authorised = 2000,
  invalidPasswd = 2001,
  invalidUsername = 2002,
  serverSideError = 3000,
  clientSideError = 3001,
}
export enum Keywords {
  loginAttemptAccepted = "Login successful",
  loginAttemptInvalidPasswd = "Login failed, invalid password",
  loginAttemptInvalidUsernm = "Login failed, invalid username",
  loginAttemptServerSideFail = "Login failed, server-side internal error, contact z.liu@outlook.com.gr",
}
export interface User {
  ID: number;
  UserName: string;
  PasswdHash: string;
  PermLevel: number;
}
export interface CaseValue {
  msg: Keywords;
  verified: boolean;
  user: User;
}
export interface RejectedResponseType {
  response: {};
  success: boolean;
}
