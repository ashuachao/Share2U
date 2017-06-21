import React, { Component } from 'react'
import { addComment, testImutable } from '../../reducers/comment';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { signIn } from 'reducers/login';
import { Carousel, Button } from 'antd-mobile';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import style from './index.scss';
import Loading from 'components/Loading/Loading';

@withRouter
@connect(
    (state) => {
        return {
            login: state.login
        }
    },
    (dispatch) => {
        return {
            signInAction: (user) => {
                dispatch(signIn(user))
            }
        }
    }
)
export default class Login extends Component{
    constructor(props) {
        super(props);
        /**
         * 通过js引入的图片webpack不会打包
         * 通过require的东西会被打包到bundle
         * 返回的是imgs/xxx.jpeg
         * 即url-loader处理过的路径
         */
        this.state={
            data: [
                require('images/43159800e84286929d5462183144176f.webp'),
                require('images/1b47bb675b7deb8df6e3527363098882.webp'),
                require('images/acf4842e063a80de2a86c15f17b0430a.webp'),
                require('images/ff08c0582da0431d70a99098a4132c38.webp')
            ]
        }
    }
    handleLogin() {
        this.props.signInAction({
            userName: 'JOE',
            content: 'now'
        })
    }
    handleImage(e) {
        e.preventDefault();
    }
    componentWillReceiveProps(nextProps) {
        this._validateSignOut(nextProps);
    }
    _validateSignOut(validateProps) {
        const { login, history } = validateProps;
        if (login.isAuthenticating_in && login.isAuthenticate_success) {
            history.push('/', {})
        }
    }
    render() {
        const page_height = document.documentElement.clientHeight;
        return (
            <CSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
                transitionAppear={true}
                transitionAppearTimeout={500}>
                <div className={style.medium}>
                    <Carousel
                        className={style.my_carousel}
                        style={{height: '100%'}}
                        // autoplay={true} 
                        infinite 
                        >
                        {this.state.data.map(ii => (
                            <a href="http://www.baidu.com" key={ii} onClick={this.handleImage.bind(this)}>
                            <img
                                style={{height: page_height}}
                                src={`${ii}`}
                            />
                            </a>
                        ))} 
                    </Carousel>
                    {
                        this.props.login.isAuthenticating_in && !this.props.login.isAuthenticate_success ?
                        (
                            <Loading loading_content='loading_content'/>
                        ):
                        null
                    }
                    <div className={`${style.login}`}>
                        <Button 
                            // size='small'
                            inline={true}
                            onClick={this.handleLogin.bind(this)}
                            style={{backgroundColor: 'red', color: '#fff'}}>
                            登录/注册
                        </Button>
                        <Button 
                            // size='small'
                            inline={true}
                            style={{color: 'red'}}>
                            进入&体验
                        </Button>    
                    </div>
                </div>
            </CSSTransitionGroup>
        )
    }
}