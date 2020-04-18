import React, {Component} from 'react';
import {connect} from "react-redux";
import {getPhotos} from "../../store/actions /photosAction";
import {
    Button,
    Card,
    CardBody,
    CardImg,
    CardText,
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

class MainPage extends Component {
    state = {
      photo: false,
      src: ''
    };

    componentDidMount() {
        this.props.getPhotos()
    }

    showPhoto = e => {
      this.setState({photo: !this.state.photo, src: e.target.id})
    };

    closePhoto = () => {
        this.setState({photo: false})
    };

    render() {
        const photos = this.props.photos;
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
                <Row>
                    {photos && photos[0] ?
                        photos.map(photo => (
                            <Col sm={4} key={photo._id}>
                                <Card className='mb-3'>
                                    <CardImg style={{cursor: 'pointer'}} top width="100%" id={photo.image} onClick={this.showPhoto} src={`${apiURL}/uploads/${photo.image}`} alt="Card image cap" />
                                    <CardBody>
                                        <CardTitle id={photo.image} onClick={this.showPhoto} style={{cursor: 'pointer'}}><b>{photo.title}</b></CardTitle>
                                        <CardText ><b>От</b>: <NavLink to={`/view/${photo.user._id}`} >{photo.user.facebookId ? photo.user.firstName : photo.user.username}</NavLink></CardText>
                                    </CardBody>
                                </Card>
                            </Col>
                        )): <h2>Нет фотографий</h2>
                    }
                </Row>

            </Container>
        );
    }
}

const mapStateToProps = state => ({
   photos: state.photos.photos
});

const mapDispatchToProps = dispatch => ({
   getPhotos: () => dispatch(getPhotos())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);