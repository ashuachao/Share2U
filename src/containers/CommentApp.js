import style from '../style/index.css';
import React, {Component} from 'react';
// jsx -> js对象 -> Dom元素,把reactDOM单独出来是因为有可能吧js对象渲染为DOM/APP
import CommentInput from './CommentInput';
import CommentList from './CommentList';
export default class CommentApp extends Component {
    constructor(props) {
        super(props)
    }
    // componentWillMount() {
    //     this._loadComments();
    // }
    // _loadComments() {
    //     const comments = localStorage.getItem('comments');
    //     if (comments) {
    //         this.setState({comments: JSON.parse(comments)})
    //     }
    // }
    // _saveComments(comments) {
    //     localStorage.setItem('comments', JSON.stringify(comments));
    // }
    _testKey() {
        // key属性可以重新销毁和创建组件
        this.setState({
            _key: Math.random()
        })
    }
    render() {
        return (
            <div className={style.wrapper}>
                <CommentInput/>
                <CommentList />
            </div>
        )
    }
}
// export default WrapWithLoadData(CommentApp, 'comment');