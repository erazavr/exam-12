import React, {Component} from 'react';
import {Button, Col, Container, Form, FormGroup} from "reactstrap";
import FormElement from "../../components/FormElement/FormElement";
import {newPhoto} from "../../store/actions /photosAction";
import {connect} from "react-redux";

class NewPhoto extends Component {
    state = {
      title: '',
      image: '',
    };
    submitFormHandler = event => {
        event.preventDefault();
        event.preventDefault();

        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            formData.append(key, this.state[key]);
        });

        this.props.newPhoto(formData);
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
    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })
    };
    render() {
        return (
            <Container>
                <div className='mb-5'>
                    <h2>Добавить новое фото</h2>
                </div>
                <Form onSubmit={this.submitFormHandler}>
                    <FormElement
                        propertyName='title'
                        title='Название фото'
                        value={this.state.title}
                        onChange={this.inputChangeHandler}
                        error={this.getFieldError('title')}
                        autocomplete="new-title"
                        type='text'
                    />
                    <FormElement
                        propertyName='image'
                        title='Изображение'
                        onChange={this.fileChangeHandler}
                        error={this.getFieldError('image')}
                        type='file'
                    />
                    <FormGroup row>
                        <Col sm={{offset: 2, size: 10}}>
                            <Button color='primary' type='submit'>
                                Создать фото
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Container>
        );
    }
}
const mapStateToProps = state => ({
   user: state.users.user,
   error: state.photos.error
});
const mapDispatchToProps = dispatch => ({
    newPhoto: photoData => dispatch(newPhoto(photoData))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPhoto);