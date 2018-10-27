import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import LoginForm from 'grommet/components/LoginForm';
import Box from 'grommet/components/Box';

class Login extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
            error: false
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit({username, password}) {
        if(username == 'user' && password == 'password'){
            this.props.goToPage('/flights');
        } else {

            this.setState({
                username,
                password,
                error: 'Wrong username or password'
            })
        }
    }

    render() {
        return (
            <Box
                align="center"
                justify="center"
            >
                <LoginForm
                    defaultValues={this.state}
                    usernameType="text"
                    errors={[this.state.error]}
                    onSubmit={this.onSubmit}
                    title="Login"
                />
            </Box>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    goToPage: (page) => dispatch(push(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
