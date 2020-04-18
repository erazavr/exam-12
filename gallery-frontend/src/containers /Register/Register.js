import React, {Component} from 'react';
import {Button, Col, Container, Form, FormGroup} from "reactstrap";
import {connect} from "react-redux";
import FormElement from "../../components/FormElement/FormElement";
import {registerUser} from "../../store/actions /usersAction";

class Register extends Component {
    state = {
        username: '',
        password: '',
    };
    submitFormHandler = event => {
        event.preventDefault();
        this.props.registerUser(this.state);
    };
    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    getFieldError = fieldName => {
      try {
          return this.props.error.errors[fieldName].message
      } catch (error) {
        return undefined
      }
    };

    render() {
        return (
            <>
                <Container>
                    <h1 className='mb-5'>Регистрация</h1>
                    <Form onSubmit={this.submitFormHandler}>
                        <FormElement
                            propertyName='username'
                            title='Имя пользователя'
                            value={this.state.username}
                            onChange={this.inputChangeHandler}
                            error={this.getFieldError('username')}
                            placeholder='Ваше имя'
                            autoComplete='new-username'
                            required={true}
                            type='text'
                        />
                        <FormElement
                            propertyName='password'
                            title='Ваш пароль'
                            value={this.state.password}
                            onChange={this.inputChangeHandler}
                            error={this.getFieldError('password')}
                            placeholder='Пароль'
                            autoComplete='new-password'
                            required={true}
                            type='password'
                        />
                    <FormGroup row>
                        <Col sm={{offset: 2, size: 10}}>
                            <Button color='primary' type='submit'>
                                 Зарегистрироваться
                            </Button>
                        </Col>
                    </FormGroup>
                    </Form>
                </Container>
            </>
        );
    }
}

const mapStateToProps = state => ({
   loading: state.users.registerLoading,
   error: state.users.registerError
});
const mapDispatchToProps = dispatch => ({
   registerUser: userData => dispatch(registerUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);