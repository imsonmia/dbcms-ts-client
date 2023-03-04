import React from "react";
import "./DbParser.css";
import DbItem from "./DbItem/DbItem";
import { DbTableContext } from "../../Context";
import { DatabaseResponseType, Datum } from "../../types";
class DbParser extends React.Component<{ dbResult: string }> {
    static contextType = DbTableContext;
    context!: React.ContextType<typeof DbTableContext>;
    constructor(props: { dbResult: string }) {
        super(props);
    }
    getDispElement(dbObj: Datum, index: number): JSX.Element {
        var keyNames = Object.getOwnPropertyNames(dbObj);
        return (
            <DbItem
                key={index}
                keys={keyNames}
                db={dbObj}
                passwd={this.context.passwd}
            />
        );
    }
    render() {
        var elements: JSX.Element[] = [];
        let dbStr = this.props.dbResult;
        if (dbStr === "" || dbStr === null) {
            return null;
        } else {
            var dbObj: DatabaseResponseType = JSON.parse(dbStr);
            dbObj.data.forEach((obj: Datum, index: number) => {
                elements.push(this.getDispElement(obj, index));
            });
        }
        return (
            <div id="db-parser">
                <h3 className="db-parser--header">
                    List of all items in database
                </h3>
                <div id="db-info">{elements}</div>
            </div>
        );
    }
}
export default DbParser;
