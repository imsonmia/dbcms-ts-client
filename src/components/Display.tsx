import React from "react";
import { globalContext } from "../Context";
interface DisplayProps {
  onQueryClick: Function;
}

export default class Display extends React.Component<DisplayProps> {
  /* https://reactjs.org/docs/context.html#classcontexttype */
  static contextType = globalContext;
  context!: React.ContextType<typeof globalContext>;

  constructor(displayProps: DisplayProps) {
    super(displayProps);
  }

  render(): React.ReactNode {
    const user = this.context.user;
    return <div id="display"></div>;
  }
}
