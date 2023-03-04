import { randomInt } from "crypto";
import React from "react";
import { LoginContext } from "../../Context";
import { AcceptedResponseType } from "../../types";
interface RegisterAppProps {}
interface DbIdArrayType {
    status: number;
    statusMsg: number;
    time: string;
    data: Array<{ ID: number }>;
}
class RegisterApp extends React.Component {
    static contextType = LoginContext;
    context!: React.ContextType<typeof LoginContext>;
    constructor(props: RegisterAppProps) {
        super(props);
    }
    generateUniqueID(idArray: Array<{ ID: number }>): number {
        var id = NaN;
        var isIdentical = true;
        while (isIdentical) {
            id = randomInt(10000, 100000);
            idArray.forEach((idKey) => {
                if (id !== idKey.ID) {
                    isIdentical = false;
                }
            });
        }
        return id;
    }
    async register(username: string, hashedPassword: string): Promise<boolean> {
        const res = await fetch(
            `${this.context.urls.base}/api/query?table=${this.context.urls.authTable}&col=ID`,
            {
                mode: "cors",
                method: "GET",
            }
        );
        const respObj: DbIdArrayType = await res.json();
        const connectionBody = {
            recordColumns: [this.generateUniqueID(respObj.data)],
        };
        const response = await fetch(
            `${this.context.urls.base}/api/modify?db=${this.context.urls.db}&table=${this.context.urls.authTable}`,
            {
                mode: "cors",
                method: "POST",
                body: JSON.stringify(connectionBody),
            }
        );
        if (response.status != 200) {
            return false;
        }
        return true;
    }
    handleRegisterClick(event: React.MouseEvent) {
        event.preventDefault();
    }
    render() {
        return (
            <div id="register-app">
                <button></button>
            </div>
        );
    }
}
