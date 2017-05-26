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
    handleSignOut(e) {
        this.props.signOutAction();
    }
    componentDidMount() {
        this._redirectSignInValidate(this.props)
    }
    componentWillReceiveProps(nextProps) {
        this._redirectSignOutValidate(nextProps)
    }
    _redirectSignOutValidate(validataProps) {
        const { login, history } = validataProps;
        if (!login.isAuthenticating_in && !login.user) {
            history.push('Login', {})
        }
    }
    _redirectSignInValidate(validataProps) {
        this.props.signInAction()
    }
    render() {
        const userName = getDataDeep(['user', 'userName'], this.props.login);
        return (
            <CSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
                transitionAppear={true}
                transitionAppearTimeout={500}>
                <div className={style.wrapper}>
                    <Tag data-seed="logId">{`welcome, ${userName}`}</Tag>
                    <CommentInput/>
                    <CommentList />
                    <Button 
                        type='warning'
                        onClick={this.handleSignOut.bind(this)}>
                        SIGNOUT
                    </Button>
                    <Button 
                        onClick={this.handleTest.bind(this)}>
                        TEST
                    </Button>
                    <Link to='/404'>404</Link>
                </div>
            </CSSTransitionGroup>
        )  
    }
}