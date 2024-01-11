import React from "react";

class UneditableInputWithLabel extends React.Component {
  render() {
    return (
      <div className="form-group">
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <input
          type="text"
          style={{height: "6vh"}}
          className="form-control mt-1"
          id={this.props.id}
          value={this.props.value}
          disabled={true}
        />
      </div>
    );
  }
}

export default UneditableInputWithLabel;
