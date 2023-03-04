import React from "react";
import "./DbConnector.css";
import { renderToStaticMarkup } from "react-dom/server";
import { DbTableContext } from "../../Context";
class DbConnector extends React.Component<
    {
        resolveDb: (dbStr: string) => void;
    },
    {
        labels: string[];
        response: {};
    }
> {
    static contextType = DbTableContext;
    context!: React.ContextType<typeof DbTableContext>;
    constructor(props: { resolveDb: (dbStr: string) => void }) {
        super(props);
        this.state = {
            labels: [],
            response: {},
        };
    }
    handleQueryClick() {
        this.queryRecords(this.context.db, this.context.table);
        return;
    }
    handleAddRecordClick() {
        var collection = document.getElementById("entries")?.children;
        var records = [];
        //
        if (!collection) {
            return;
        }
        for (let i = 0; i < collection.length; i++) {
            let element = collection.item(i);
            if (element == null || !(element instanceof HTMLInputElement)) {
                continue;
            }
            records.push(element.value);
        }
        this.addRecord(this.context.db, this.context.table, records);
        this.queryRecords(this.context.db, this.context.table);
    }
    /**
     * Add record with array of values to table in database with credentials
     * @param {string} db - name of database to append data to.
     * @param {string} table - name of table in db to append data record to.
     * @param {any[]} records - list of values to append to a new record, must match length of the number of columns in table.
     * @returns
     */
    addRecord(db: string, table: string, records: any[]) {
        let names = this.state.labels;
        if (names.length !== records.length) {
            return false;
        }
        var recordCol = {
            recordColumns: records,
        };
        var params = {
            headers: {
                "content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(recordCol),
            method: "POST",
        };
        fetch(
            `http://192.168.2.100:9000/api/modify?db=${db}&table=${table}`,
            params
        )
            .then((data) => {
                return data.json();
            })
            .then((value) => {
                console.log(value);
                this.setState({ response: value });
            })
            .catch((err) => {
                console.log(err);
            });
        this.queryRecords(db, table);
    }
    /**
     *
     * @param {Object} response
     */
    /**
     * Query record of table in database with fetch API GET request
     * @param {string} db - name of database to access
     * @param {string} table - name of table from db to access
     */
    queryRecords(db: string, table: string) {
        var obj = undefined;
        fetch(`http://192.168.2.100:9000/api/query?db=${db}&table=${table}`)
            .then((value) => value.json())
            .then((value) => {
                obj = value;
                this.props.resolveDb(JSON.stringify(obj));
                var res: any[] = [];
                var names = Object.getOwnPropertyNames(obj.data[0]);
                names.forEach((val) => {
                    res.push(<label htmlFor={`input-${val}`}>{val}</label>);
                    res.push(
                        <input
                            type="text"
                            name={`input-${val}`}
                            id={val}
                        ></input>
                    );
                });
                if (
                    !document.getElementById("entries") ||
                    !document.getElementById("entries")
                ) {
                    return;
                }
                (document.getElementById("entries") as HTMLElement).innerHTML =
                    "";
                res.forEach((element) => {
                    (
                        document.getElementById("entries") as HTMLElement
                    ).innerHTML += renderToStaticMarkup(element);
                });
                this.setState({ labels: names, response: obj });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <div className="entries-container">
                <h3 className="entries-container--main-header">
                    Supermarket database
                </h3>
                <div id="entries"></div>
                <ResponseText
                    obj={JSON.stringify(this.state.response)}
                ></ResponseText>
                <button
                    id="db-update-btn"
                    onClick={() => this.handleQueryClick()}
                >
                    Query all items in database
                </button>
                <button
                    id="db-add-btn"
                    onClick={() => this.handleAddRecordClick()}
                >
                    Add new item record to database
                </button>
            </div>
        );
    }
}
class ResponseText extends React.Component<{ obj: any }> {
    constructor(props: { obj: any }) {
        super(props);
    }
    renderText(obj: any) {
        // if (obj === {}) {
        //   return null;
        // }
        // let keys = Object.keys(obj);
        // let vals = Object.values(obj);
        // return keys.map((val, index) => {
        //   let value = vals[index];
        //   if (typeof value == "object") {
        //     value = JSON.stringify(vals[index]);
        //   }
        //   console.log(`${val}: ${value}`);
        const status = obj.status ? obj.status : "";
        const statusMsg = obj.statusMsg ? obj.statusMsg : "";
        const time = obj.time ? obj.time : "";
        const serverStatus = obj.serverStatus ? obj.serverStatus : "";
        return (
            <>
                <span>
                    <b>HTTP Status: </b>
                    {`${status} ${statusMsg}`}
                </span>
                <br></br>
                <span>
                    <b>Timestamp: </b>
                    {time}
                </span>
                <br></br>
                <span>
                    <b>Database Status Code: </b>
                    {serverStatus}
                </span>
                <br></br>
            </>
        );
    }
    render() {
        return <div>{this.renderText(JSON.parse(this.props.obj))}</div>;
    }
}
export default DbConnector;
