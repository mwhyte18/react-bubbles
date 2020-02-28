import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import M from "materialize-css";
class Login extends React.Component {
  state = {
    credentials: {
      username: "",
      password: ""
    }
  };

  handleChange = event => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [event.target.name]: event.target.value
      }
    });
  };
  componentDidMount() {
    M.AutoInit();
  }

  login = event => {
    event.preventDefault();
    axiosWithAuth()
      .post("/api/login", this.state.credentials)
      .then(res => {
        window.localStorage.setItem("token", res.data.payload);
        this.props.history.push("/bubblepage");
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="login">
        <form onSubmit={this.login}>
          <div class="row">
            <div class="input-field col s6">
              <input
                id="textarea1"
                class="materialize-textarea"
                type="text"
                name="username"
                value={this.state.credentials.username}
                onChange={this.handleChange}
              />
              <label for="textarea1">usename</label>
            </div>
            <div class="input-field col s6">
              <input
                id="textarea2"
                class="materialize-textarea"
                type="password"
                name="password"
                value={this.state.credentials.password}
                onChange={this.handleChange}
              />
              <label for="textarea2">password</label>
            </div>
            <button class="waves-effect waves-light btn">Login</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
