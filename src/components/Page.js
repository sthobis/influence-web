import React, { Component } from "react";

class Page extends Component {
  componentDidMount() {
    const { title } = this.props;
    document.title = title || "Influence";
  }

  render() {
    const { children, className } = this.props;
    return <div className={className}>{children}</div>;
  }
}

export default Page;
