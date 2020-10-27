import React, { Component } from "react";
import { Redirect } from 'react-router'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

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
            <Container style={{marginTop: "100px"}} component="main" maxWidth="xs">
            <CssBaseline />
            <div>
              <Typography component="h1" variant="h5">
                Create New Account
              </Typography>
              <form style={{width: "100%"}} onSubmit={this.submitHandler} noValidate>
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  value={this.state.first_name} 
                  onChange={(e) => this.onChangeHandler(e)}
                  id="first_name"
                  label="First name"
                  name="first_name"
                  autoComplete="firstname"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  value={this.state.last_name} 
                  onChange={(e) => this.onChangeHandler(e)}
                  id="last_name"
                  label="Last Name"
                  name="last_name"
                  autoComplete="lastname"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  value={this.state.user_name} 
                  onChange={(e) => this.onChangeHandler(e)}
                  id="user_name"
                  label="User Name"
                  name="user_name"
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  value={this.state.password} 
                  onChange={(e) => this.onChangeHandler(e)}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  value={this.state.nickname} 
                  onChange={(e) => this.onChangeHandler(e)}
                  id="nickname"
                  label="Nickname"
                  name="nickname"
                  autoComplete="nickname"
                  autoFocus
                />                
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={this.state.dob} 
                onChange={(e) => this.onChangeHandler(e)}
                id="dob"
                label="Date of Birth"
                name="dob"
                autoComplete="dob"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={this.state.current_location} 
                onChange={(e) => this.onChangeHandler(e)}
                id="current_location"
                label="Current Home Address"
                name="current_location"
                autoComplete="current_location"
                autoFocus
              />
                <Button
                  style={{marginTop:"10px"}}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Sign Up
                </Button>
              </form>
            </div>
          </Container>
        );
    }
}