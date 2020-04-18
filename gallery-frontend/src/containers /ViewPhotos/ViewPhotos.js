import React, {Component} from 'react';
import {deletePhoto, getPhotos} from "../../store/actions /photosAction";
import {connect} from "react-redux";
import {
    Button,
    Card,
    CardBody,
    CardImg,
    CardTitle,
    Col,
    Container,
    Modal,
    ModalBody,
    ModalFooter,
    Row
} from "reactstrap";
import {apiURL} from "../../constans";
import {NavLink} from "react-router-dom";
import {getUserById} from "../../store/actions /usersAction";

class ViewPhotos extends Component {
    state = {
        photo: false,
        src: ''
    };
    requestData = () => {
        const userId = this.props.match.params.id;
        this.props.getPhotos(userId);
        this.props.getUserById(userId)
    };
    async componentDidMount() {
        this.requestData()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.requestData()
        }
    }

    showPhoto = e => {
        this.setState({photo: !this.state.photo, src: e.target.id})
    };

    closePhoto = () => {
        this.setState({photo: false})
    };

    method = () => {
        if (this.props.userById) {
                if (this.props.userById.facebookId) {
                    return <h2 className='mb-5'>Галерея {this.props.userById.firstName}</h2>
                } else {
                    return <h2 className='mb-5'>Галерея {this.props.userById.username}</h2>
                }
            };
        };


    render() {
        const photos = this.props.photos;
        const style = {
          textDecoration: 'none',
          padding: '10px 10px',
          backgroundColor: '#007bfe',
          color: 'white',
          borderRadius: '5px'
        };
        return (
            <Container>
                <Modal isOpen={this.state.photo} toggle={this.showPhoto}>
                    <ModalBody>
                        <CardImg top width="100%" src={`${apiURL}/uploads/${this.state.src}`} alt="Card image cap" />
                    </ModalBody>
                    <ModalFooter className='justify-content-center'>
                        <Button color="primary" onClick={this.closePhoto}>Закрыть</Button>
                    </ModalFooter>
                </Modal>
                {this.method()}
                {this.props.user && this.props.userById && this.props.user._id === this.props.userById._id &&
                    <div style={{marginBottom: '30px', textAlign: 'right'}}>
                        <NavLink to='/newPhoto' style={style}>Добавить новое фото</NavLink>
                    </div>
                }
                <Row>
                        {photos && photos[0] ?
                            photos.map(photo => (
                                <Col sm={4} key={photo._id}>
                                    <Card >
                                        <CardImg id={photo.image} style={{cursor: 'pointer'}} onClick={this.showPhoto} top width="100%" src={`${apiURL}/uploads/${photo.image}`} alt="Card image cap" />
                                        <CardBody>
                                            <CardTitle style={{cursor: 'pointer'}} ><b id={photo.image} onClick={this.showPhoto}>{photo.title}</b></CardTitle>
                                        </CardBody>
                                        {this.props.user && photo.user._id === this.props.user._id && <Button style={{borderRadius: '0'}} color='danger' onClick={() => this.props.deletePhoto(photo._id)}>Удалить</Button>}
                                    </Card>
                                </Col>
                            )): <h2>У вас нет фотографий</h2>
                        }


                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
    userById: state.users.userById,
    photos: state.photos.photos
});

const mapDispatchToProps = dispatch => ({
    getPhotos: userId => dispatch(getPhotos(userId)),
    deletePhoto: photoId => dispatch(deletePhoto(photoId)),
    getUserById: userId => dispatch(getUserById(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewPhotos);