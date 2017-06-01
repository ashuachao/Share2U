import { getDataDeep } from 'util/util';
import { Link,Route,BrowserRouter as Router, withRouter, Redirect } from 'react-router-dom'
import { Button, Tag } from 'antd-mobile';
// 进入组件和离开组件的动画
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import React, {Component} from 'react';
import { connect } from 'react-redux';
// jsx -> js对象 -> Dom元素,把reactDOM单独出来是因为有可能吧js对象渲染为DOM/APP
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import Loading from 'components/Loading/Loading';
// import Login from 'containers/Login/Login';
import { signIn, signOut } from 'reducers/login';
import style from './index.scss';
import axios from 'axios';
// bring history
@withRouter
@connect(
    (state) => {
        return {
            login: state.login
        }
    },
    (dispatch) => {
        return {
            signOutAction: () => {
                dispatch(signOut())
            },
            signInAction: () => {
                dispatch(signIn())
            }
        }
    }
)
export default class CommentApp extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this._redirectSignInValidate(this.props)
    }
    componentWillReceiveProps(nextProps) {
        this._redirectSignOutValidate(nextProps)
    }
    /**
     * 登出
     * 
     * @param {any} e
     * 
     * @memberOf CommentApp
     */
    handleSignOut(e) {
        this.props.signOutAction();
    }
    /**
     * 验证需要跳转登录
     * 
     * @param {any} validataProps
     * 
     * @memberOf CommentApp
     */
    _redirectSignOutValidate(validataProps) {
        const { login, history } = validataProps;
        if (!login.isAuthenticating_in && !login.user) {
            history.push('Login', {})
        }
    }
    /**
     * 验证用户是否已登录
     * 
     * @param {any} validataProps
     * 
     * @memberOf CommentApp
     */
    _redirectSignInValidate(validataProps) {
        !this.props.login.user && this.props.signInAction()
    }
    render() {
        const userName = getDataDeep(['user', 'userName'], this.props.login);
        return (
            <CSSTransitionGroup
                transitionName="slideIn"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
                transitionAppear={true}
                transitionAppearTimeout={500}>
                <div className={style.wrapper}>
                    <div className={style.container}>
                        <div className={style.header}>
                            <Tag data-seed="logId">
                                {`welcome, ${userName}`}
                            </Tag>
                        </div>
                        <div className={style.content}>
                            <CommentInput/>
                            <CommentList />
                        </div>
                        <div className={style.footer}>
                            <Button 
                                type='warning'
                                onClick={this.handleSignOut.bind(this)}>
                                SIGNOUT
                            </Button>
                            <Link to='/Uploader'>上传文件</Link>
                            <Link to='/uass'>NOMATCH</Link>
                        </div>
                    </div>
                </div>
            </CSSTransitionGroup>
        )  
    }
}