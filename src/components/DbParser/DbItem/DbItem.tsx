import React from "react";
import "./DbItem.css";
import { GlobalContext } from "../../../Context";
import { Datum } from "../../../types";
class DbItem extends React.Component<
    {
        db: Datum;
        keys: string[];
        key: number;
        passwd: string;
    },
    { active: boolean; id: number }
> {
    static contextType = GlobalContext;
    context!: React.ContextType<typeof GlobalContext>;
    constructor(props: {
        db: Datum;
        keys: string[];
        key: number;
        passwd: string;
    }) {
        super(props);
        this.state = {
            active: false,
            id: this.props.db.ID,
        };
    }
    /**
     *
     * @param {String} key
     * @param {String} value
     * @param {number} index
     * @returns
     */
    makeElement(key: string, value: string, index: number) {
        return (
            <span className="db-item" key={index}>
                <span>
                    <b>{key}</b>: {value}
                </span>
                <br></br>
            </span>
        );
    }
    getElements() {
        var elements: JSX.Element[] = [];
        this.props.keys.forEach((string, index) => {
            elements.push(
                this.makeElement(string, (this.props.db as any)[string], index)
            );
        });
        return elements;
    }
    handleItemClick() {
        // handle style change
        if (!this.state.active) {
            this.setState({ active: true });
        } else {
            this.setState({ active: false });
        }
    }
    handleDeleteClick() {
        let passwd = prompt(
            "Enter your password credentials for the current user: "
        );
        if (passwd != this.context.user.passwd) {
            console.log(
                `User input: ${passwd}, system: ${this.context.user.passwd}`
            );

            alert("Password incorrect!");
            return;
        }
        if (this.state.id === null) {
            console.log("No ID");
            return;
        }
        fetch(
            `http://192.168.2.100:9000/api/delete?db=${this.context.db}&table=${this.context.table}&id=${this.state.id}&credentials=${this.context.dbPasswd}`,
            {
                headers: {
                    "content-type": "application/json; charset=UTF-8",
                },
                mode: "cors",
                method: "POST",
            }
        )
            .then((response) => {
                response.json();
            })
            .then((json) => {})
            .catch((err) => {
                console.log(err);
            });
    }
    handleModifyClick() {
        console.log("Not yet implemented");
    }
    render() {
        let itemClass = this.state.active
            ? "db-items--active"
            : "db-items--inactive";
        let isBtnDisabled = this.state.active ? false : true;
        return (
            <div
                className={itemClass}
                onClick={this.handleItemClick.bind(this)}
            >
                <div className="items-content-container">
                    {this.getElements()}
                </div>
                <div>
                    <button
                        className="db-item-btn"
                        onClick={this.handleDeleteClick.bind(this)}
                        hidden={isBtnDisabled}
                    >
                        DEL
                    </button>
                    <button
                        className="db-item-btn"
                        onClick={this.handleModifyClick.bind(this)}
                        hidden={isBtnDisabled}
                    >
                        MOD
                    </button>
                </div>
            </div>
        );
    }
}
export default DbItem;
