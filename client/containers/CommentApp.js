// 进入组件和离开组件的动画
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
// import style from './index.scss';
import React, {Component} from 'react';
// jsx -> js对象 -> Dom元素,把reactDOM单独出来是因为有可能吧js对象渲染为DOM/APP
import CommentInput from './CommentInput';
import CommentList from './CommentList';
// import Login from 'containers/Login/Login';
import style from './index.scss';
// import '../style/app.scss';
export default class CommentApp extends Component {
    constructor(props) {
        super(props)
    }
    _testKey() {
        // key属性可以重新销毁和创建组件
        this.setState({
            _key: Math.random()
        })
    }
    render() {
        console.log('render--------');
        return (
            <CSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
                transitionAppear={true}
                transitionAppearTimeout={500}>
                <div className={style.wrapper}>
                    <CommentInput/>
                    <CommentList />
                </div>
            </CSSTransitionGroup>
        )
    }
}
// export default WrapWithLoadData(CommentApp, 'comment');