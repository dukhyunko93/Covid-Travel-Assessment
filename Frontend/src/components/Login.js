import React, { Component } from "react";
import { Redirect } from 'react-router'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

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
                <Container style={{marginTop: "100px"}} component="main" maxWidth="xs">
                  <CssBaseline />
                  <div>
                    <Typography component="h1" variant="h5">
                      Sign in
                    </Typography>
                    <form style={{width: "100%"}} onSubmit={this.submitHandler} noValidate>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        value={this.state.user_name} 
                        onChange={(e) => this.onChangeHandler(e)}
                        id="user_name"
                        label="Email Address"
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
                      <Button
                        style={{marginTop:"10px"}}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                      >
                        Sign In
                      </Button>
                    </form>
                  </div>
                </Container>
        );
    }
}