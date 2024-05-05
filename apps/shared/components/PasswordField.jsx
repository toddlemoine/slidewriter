import React, { Component } from "react";
import "./PasswordField.css";

class PasswordField extends Component {
  state = {
    showPassword: false
  };
  togglePasswordVisibility = e => {
    e.preventDefault();
    this.setState({
      showPassword: !this.state.showPassword
    });
  };
  render() {
    const inputType = this.state.showPassword ? "text" : "password";
    return (
      <div className="password-field">
        <input
          required={true}
          type={inputType}
          name="password"
          id="password"
          onChange={this.props.onChange}
          value={this.props.value}
        />
        <button
          className="reveal-password-button"
          onClick={this.togglePasswordVisibility}
        >
          {this.state.showPassword ? "Hide" : "Show"}
        </button>
      </div>
    );
  }
}

export default PasswordField;
