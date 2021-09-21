import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
    Link,
    Grid,
    Avatar,
    Button,
    Checkbox,
    Container,
    TextField,
    Typography,
    CssBaseline,
    FormControlLabel,
} from '@material-ui/core';
import {Image, Alert} from "react-bootstrap";
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

import UserPool from './UserPool';
//import { loginSuccess } from '../../store/actions';
import { loginSuccess, authError, authLoading } from '../../store/actions/auth';
import Logo from "../../assets/vl-logo.png";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(0),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    content: {
        width: "",
    }
}));

function Login(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { tokenList, loading, error } = useSelector(state => state.auth);
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    // React.useEffect(() => {
    //     if (loginState.userData && loginState.userData.accessToken) {
    //         props.history.push('/categories')
    //     } else { }
    // }, [loginState])

    React.useEffect(() => {
        if (tokenList && tokenList.accessToken) {
            props.history.push('/categories')
        } else { }
    }, [tokenList])

    console.log("tokenList:::::::::", tokenList);

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(authLoading());
        const user = new CognitoUser({
            Username: phone,
            Pool: UserPool,
        });

        const authDetails = new AuthenticationDetails({
            Username: phone,
            Password: password,
        });

        user.authenticateUser(authDetails, {
            onSuccess: (data) => {
                console.log("OnSuccess: ", data, data.accessToken);
                dispatch(loginSuccess(data));
                localStorage.setItem("token", data.accessToken.jwtToken);
            },
            onFailure: (err) => {
                console.log("onFailure: ", err.message);
                dispatch(authError(err.message));
            },
            newPasswordRequired: (data) => {
                console.log("newPasswordRequired: ", data);
            },
        });
    };


    if(loading){
        return <p className="fs-5 fw-bold mt-2 text-center" >Loading....</p>
      }

    return (
        <Container component="main" maxWidth="xs">
            {/* <CssBaseline /> */}
            <div className={classes.paper}>
                
                <div className="text-center mt-4">
                    <Image src={Logo} className="w-50"/>
                </div>
                <p className="fs-4 fw-bold mt-2 text-start">Sign In</p>
                <form onSubmit={onSubmit} className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        fullWidth
                        id="phone"
                        label="Phone Number"
                        value={phone}
                        autoFocus
                        onChange={(event) => setPhone(event.target.value)}
                        autoComplete="off"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        LogIn
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/register" variant="body2" >
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                    {error && 
                    <Alert variant="danger" className="mt-3">{error}</Alert>
                    }
                </form>
            </div>
        </Container>
    );
}

export default Login;