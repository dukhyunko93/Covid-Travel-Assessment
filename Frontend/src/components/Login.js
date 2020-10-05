import React, { Component } from "react";
import { Redirect } from 'react-router'


  export default class Login extends Component {
/*Todo Refactor
1. add validation 
*/
    state = {
        user_name: "",
        password: "",
        redirect: false
    }

    
    
    setCookie = (cname, cvalue, exdays) => {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
      }

    postUser = () => {
        let userObj = {
            user_name: this.state.user_name,
            password: this.state.password
        }

        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({user:userObj})
        }
        
        fetch("http://localhost:3001/login", options)
        .then(response => response.json())
        .then(response => {
            this.setCookie("jwt",response.jwt,1)
            this.props.saveUser(response)
            this.setState({ redirect: true })
        })
            
    }



    onChangeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.postUser()
    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
          return <Redirect to='/'/>;
        }

        return (
            <div className="login">
                    <form onSubmit={this.submitHandler}>
                        <h3>Log In</h3>

                        <div className="form-group">
                            <label>Username</label>
                            <input type="username" name="user_name" value={this.state.user_name} onChange={(e) => this.onChangeHandler(e)} className="form-control" placeholder="Enter username" />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="password" value={this.state.password} onChange={(e) => this.onChangeHandler(e)} className="form-control" placeholder="Enter password" />
                        </div>

                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">Submit</button>
                        <p className="forgot-password text-right">
                            Forgot <a href="#">password?</a>
                        </p>
                    </form>
                </div>
        );
    }
}