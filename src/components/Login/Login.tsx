import React from "react";
import { query } from "../../connect";
import { LoginContext } from "../../Context";
import {
    AcceptedResponseType,
    RejectedResponseType,
    User,
    Keywords,
    VerificationStatus,
    CaseValue,
} from "../../types";

const verify = async (
    context: React.ContextType<typeof LoginContext>,
    hashedPassword: string,
    username: string
) => {
    const response: AcceptedResponseType | RejectedResponseType = await query(
        context.urls.base,
        context.urls.db,
        context.urls.authTable,
        "GET"
    );
    if (!response.success) {
        return {
            user: undefined,
            response: VerificationStatus.serverSideError,
        };
    }
    const userData = (response as AcceptedResponseType).response.data;
    var correctUser = null;
    userData.forEach((user) => {
        if (user.UserName === username) {
            correctUser = user;
        }
    });
    if (!correctUser) {
        return {
            user: undefined,
            response: VerificationStatus.invalidUsername,
        };
    }
    if ((correctUser as User).PasswdHash === hashedPassword) {
        return {
            user: correctUser as User,
            response: VerificationStatus.authorised,
        };
    } else {
        return {
            user: correctUser as User,
            response: VerificationStatus.invalidPasswd,
        };
    }
};
export default class Login extends React.Component {
    static contextType = LoginContext;
    // For TS pre-3.7:
    context!: React.ContextType<typeof LoginContext>;
    constructor(props: {}) {
        super(props);
        this.state = {
            verifiedUser: undefined,
        };
    }
    handleVerifyClick = (
        event: React.MouseEvent,
        context: React.ContextType<typeof LoginContext>
    ) => {
        event.preventDefault();
        const usernameInputVal = (
            document.getElementById("input-username") as HTMLInputElement
        ).value;
        const passwdInputVal = (
            document.getElementById("input-password") as HTMLInputElement
        ).value;

        if (usernameInputVal === "" || passwdInputVal === "") {
            alert("Please fill all boxes!");
            return;
        }
        const hashPasswd = passwdInputVal;
        verify(context, hashPasswd, usernameInputVal)
            .then((value) => {
                switch (value.response) {
                    case VerificationStatus.authorised:
                        return {
                            msg: Keywords.loginAttemptAccepted,
                            verified: true,
                            user: value.user,
                        };
                    case VerificationStatus.invalidPasswd:
                        return {
                            msg: Keywords.loginAttemptInvalidPasswd,
                            verified: false,
                            user: value.user,
                        };
                    case VerificationStatus.invalidUsername:
                        return {
                            msg: Keywords.loginAttemptInvalidUsername,
                            verified: false,
                            user: value.user,
                        };
                    case VerificationStatus.serverSideError:
                        return {
                            msg: Keywords.loginAttemptServerSideFail,
                            verified: false,
                            user: value.user,
                        };
                }
            })
            .then((value) => {
                if (!value) {
                    return;
                }
                (
                    document.getElementById(
                        "p-query-resolve"
                    ) as HTMLParagraphElement
                ).textContent = (value as CaseValue).msg;
                if (value.user) {
                    this.setState({ verifiedUser: value.user });
                    this.context.setUser(value.user);
                }
            });
    };
    render() {
        return (
            <div className="login">
                <label id="label-username">Username: </label>
                <input type="text" required={true} id="input-username"></input>
                <br></br>
                <label id="label-password">Password: </label>
                <input
                    type="password"
                    required={true}
                    id="input-password"
                ></input>
                <br></br>
                <button
                    onClick={(ev) => {
                        this.handleVerifyClick(ev, this.context);
                    }}
                    id="button-login"
                >
                    Login
                </button>
                <p id="p-query-resolve"></p>
            </div>
        );
    }
}
