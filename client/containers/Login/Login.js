import React, { Component } from 'react'
import { addComment, testImutable } from '../../reducers/comment';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signIn } from 'reducers/login';
import { Carousel, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import style from './index.scss';
import Loading from 'components/Loading/Loading';
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
        this.state={
            data: [
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495622219844&di=63a566b3a86fa8f4343ba21d289be495&imgtype=0&src=http%3A%2F%2Fimage.tianjimedia.com%2FuploadImages%2F2017%2F137%2F45%2FV338CS7769K3_timg.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495622219844&di=b170d241f77b22805d428b9634a786ed&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01445b56f1ef176ac7257d207ce87d.jpg%40900w_1l_2o_100sh.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495622219844&di=7edff1a2860c00c7209d514c47c548c6&imgtype=0&src=http%3A%2F%2Fs15.sinaimg.cn%2Fmw690%2F001o5iZ4gy6IGX57OTY8e%26690'
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