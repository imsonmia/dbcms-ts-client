import React from "react";
import DbConnector from "./components/DbConnector/DbConnector";
import DbParser from "./components/DbParser/DbParser";
import Login from "./components/Login/Login";
import { LoginContext, DbTableContext } from "./Context";
import { User } from "./types";
import "./App.css";
export default class App extends React.Component<
    {},
    {
        dbResult: string;
        user: { username: string; id: number };
        setUser: (newUser: User) => void;
        urls: {
            base: string;
            db: string;
            itemsTable: string;
            financesTable: string;
            authTable: string;
        };
    },
    {}
> {
    resolveDb(result: string) {
        this.setState({ dbResult: result });
        return;
    }
    setUser = (newUser: User) => {
        this.setState({
            user: {
                username: newUser.UserName,
                id: newUser.ID,
            },
        });
    };
    constructor(props: {}) {
        super(props);
        this.state = {
            dbResult: "",
            user: {
                username: "",
                id: NaN,
            },
            setUser: this.setUser,
            urls: {
                base: "http://192.168.2.100:9000",
                db: "supermarket",
                itemsTable: "items",
                financesTable: "finances",
                authTable: "auth",
            },
        };
    }
    render() {
        return (
            <LoginContext.Provider value={this.state}>
                <div className="App">
                    <div className="db-grid-container">
                        <div className="login-container">
                            <p className="text" id="login-status"></p>
                            <Login></Login>
                        </div>
                        <DbTableContext.Provider
                            value={{
                                db: "supermarket",
                                table: "items",
                                passwd: "imsonmia",
                            }}
                        >
                            <h1 className="db-grid-item1">
                                Database management system
                            </h1>
                            <div className="db-grid-item2">
                                <DbConnector
                                    resolveDb={this.resolveDb.bind(this)}
                                />
                            </div>
                            <div className="db-grid-item3">
                                <DbParser dbResult={this.state.dbResult} />
                            </div>
                        </DbTableContext.Provider>
                    </div>
                </div>
            </LoginContext.Provider>
        );
    }
}
