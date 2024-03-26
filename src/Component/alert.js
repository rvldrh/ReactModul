import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Alert extends Component {
  render() {
    return (
      <div>
        <div className="alert alert-success">
          <h1>INFO</h1>
          <p>Info nya mas monggo</p>
        </div>
        <div className="alert alert-danger">
          <h1>INFO</h1>
          <p>Info nya mas monggo</p>
        </div>
        <div className="alert alert-warning">
          <h1>INFO</h1>
          <p>Info nya mas monggo</p>
        </div>
        <div className="alert alert-primary">
          <h1>INFO</h1>
          <p>Info nya mas monggo</p>
        </div>
        <div className="alert alert-info">
          <h1>INFO</h1>
          <p>Info nya mas monggo</p>
        </div>
        <div className="alert alert-light">
          <h1>INFO</h1>
          <p>Info nya mas monggo</p>
        </div>
        <div className="alert alert-dark">
          <h1>INFO</h1>
          <p>Info nya mas monggo</p>
        </div>
      </div>
    );
  }
}
