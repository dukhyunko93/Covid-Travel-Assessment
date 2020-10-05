import React, { Component } from "react";
import { Redirect } from 'react-router'

export default class SignUp extends Component {
    
/*Todo Refactor
1. add form validation 
2. Fix the form with nickname null
*/
    state = {
        user_name: "",
        password: "",
        first_name:"",
        last_name:"",
        dob:"",
        nickname:"",
        current_location:"",
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
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            dob: this.state.dob,
            user_name: this.state.user_name,
            password: this.state.password,
            current_location:this.state.current_location,
            nickname: this.state.nickname
           
        }
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            },
            body: JSON.stringify({user:userObj})
        }
        
        fetch("http://localhost:3001/users", options)
        .then(response => response.json())
        .then(response => {
            this.setCookie("jwt",response.jwt,1)
            this.props.saveUser(response)
            this.setState({ redirect: true })
        })
    }
    
    onChangeHandler = (e) => {
        this.setState({[e.target.name]:e.target.value})
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
            <div className="signup">
                    <form onSubmit={this.submitHandler}>
                        <h3>Sign Up</h3>

                        <div className="form-group">
                            <label>First name</label>
                            <input type="text" value={this.state.first_name} onChange={(e) => this.onChangeHandler(e)} name="first_name" className="form-control" placeholder="First name" />
                        </div>

                        <div className="form-group">
                            <label>Last name</label>
                            <input type="text" value={this.state.last_name} onChange={(e) => this.onChangeHandler(e)} name="last_name" className="form-control" placeholder="Last name" />
                        </div>

                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" value={this.state.username} onChange={(e) => this.onChangeHandler(e)} name="user_name" className="form-control" placeholder="Enter username" />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" value={this.state.password} onChange={(e) => this.onChangeHandler(e)} name="password" className="form-control" placeholder="Enter password" />
                        </div>

                        <div className="form-group">
                            <label>Nickname</label>
                            <input type="text" value={this.state.nickname} onChange={(e) => this.onChangeHandler(e)} name="nickname" className="form-control" placeholder="Enter nickname" />
                        </div>

                        <div className="form-group">
                            <label>Date Of Birth</label>
                            <input type="text" value={this.state.dob} onChange={(e) => this.onChangeHandler(e)} name="dob" className="form-control" placeholder="Enter Date Of Birth" />
                        </div>
                        
                        <div className="form-group">
                            <label>Current Home Address</label>
                            <input type="text" value={this.state.current_location} onChange={(e) => this.onChangeHandler(e)} name="current_location" className="form-control" placeholder="Enter your current address" />
                        </div>
                        
                        

                        <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                        <p className="forgot-password text-right">
                            Already registered <a href="#">sign in?</a>
                        </p>
                    </form>
                </div>
        );
    }
}