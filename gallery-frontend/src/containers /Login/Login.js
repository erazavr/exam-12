 import React, {Component} from 'react';
import FormElement from "../../components/FormElement/FormElement";
import {Alert, Button, Col, Form, FormGroup} from "reactstrap";
import {loginUser} from "../../store/actions /usersAction";
import {connect} from "react-redux";
 import FacebookLogin from "../../components/FacebookLogin/FacebookLogin";

class Login extends Component {
    state = {
        username: '',
        password: ''
    };
    submitFormHandler = event => {
        event.preventDefault();
        this.props.loginUser({...this.state})
    };
    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    render() {
        return (
            <>
                <h1>Вход</h1>
                {this.props.error &&
                    <Alert color='danger'>{this.props.error.error}</Alert>
                }
                <FacebookLogin/>
                <Form onSubmit={this.submitFormHandler}>
                    <FormElement
                        propertyName='username'
                        title='Имя пользователя'
                        value={this.state.username}
                        onChange={this.inputChangeHandler}
                        type='text'
                        autoComplete="current-username"
                    />
                    <FormElement
                        propertyName='password'
                        title='Ваш пароль'
                        value={this.state.password}
                        onChange={this.inputChangeHandler}
                        type='password'
                        autoComplete="current-password"
                    />
                    <FormGroup row>
                        <Col sm={{offset: 2, size: 10}}>
                            <Button color='primary' type='submit'>
                                Войти
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </>
        );
    }
}
const mapStateToProps = state => ({
   loading: state.users.loginLoading,
    error: state.users.loginError,
});
const mapDispatchToProps = dispatch => ({
   loginUser: userData => dispatch(loginUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);