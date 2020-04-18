import React from 'react';
import FacebookLoginButton from 'react-facebook-login/dist/facebook-login-render-props'
import {Button} from "reactstrap";
import {useDispatch} from "react-redux";
import {loginWithFacebook} from "../../store/actions /usersAction";

const FacebookLogin = () => {
    const dispatch = useDispatch();

    const callback = (facebookData) => {
        console.log('INFO FROM FACEBOOK: ' , facebookData);
        if (facebookData.id) {
            dispatch(loginWithFacebook(facebookData));
            console.log('YES')
        } else {
            console.log('NO')
        }
    };
    return (
        <FacebookLoginButton
            appId="2653032474977268"
            callback={callback}
            render={renderProps => (
                <Button
                    className='mb-4 mt-4'
                    color='primary'
                    onClick={renderProps.onClick}>
                    Login with Facebook
                    <i className="fab fa-facebook ml-2" style={{fontSize: '20px'}}/>
                </Button>
            )}
        />
    );
};

export default FacebookLogin;