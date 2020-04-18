import React from 'react';
import {Route, Switch} from "react-router-dom";
import {Container} from "reactstrap";
import Toolbar from "./components/UI/Toolbar/Toolbar";
import {ToastContainer} from "react-toastify";
import MainPage from "./containers /MainPage/MainPage";
import Register from "./containers /Register/Register";
import Login from "./containers /Login/Login";
import ViewPhotos from "./containers /ViewPhotos/ViewPhotos";
import NewPhoto from "./containers /NewPhoto/NewPhoto";

const App = () => {
    return (
        <>
            <ToastContainer autoClose={2000}/>
            <header>
                <Toolbar/>
            </header>
            <Container className='mt-5'>
                <Switch>
                    <Route path='/' exact component={MainPage}/>
                    <Route path='/register' exact component={Register}/>
                    <Route path='/login' exact component={Login}/>
                    <Route path='/view/:id' exact component={ViewPhotos}/>
                    <Route path='/newPhoto' exact component={NewPhoto}/>
                    <Route render={()=> <h1>Not Found</h1>}/>
                </Switch>
            </Container>
        </>
    );
};

export default App;