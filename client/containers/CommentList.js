import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentList from '../components/CommentList';
import { initComments, deleteComment, afterDeleteComment } from '../reducers/comment';
// smart组件 
// 负责评论列表数据的加载、初始化和删除
class CommentListContainer extends Component {
    componentWillMount() {
        // // 浏览器环境
        // if (window) {
        //     this._loadComments();
        // }
    }
    _loadComments() {
        let comments = localStorage.getItem('comments');
        comments = comments ? JSON.parse(comments) : [];
        this.props.initComments(comments);
    }
    handleDeleteComment(index) {
        const { comments } = this.props;
        const newComments = [
            ...comments.slice(0, index),
            ...comments.slice(index + 1)
        ]
        localStorage.setItem('comments', JSON.stringify(newComments));
        if (this.props.onDeleteComment) {
            this.props.onDeleteComment(index);
        }
        // setTimeout(() => {
        //     this.props.onAfterDeleteComment({
        //         username: 'joechan',
        //         content: 'thunk_test'
        //     })
        // }, 1000)
    }
    render () {
        return (
        <CommentList
            comments={this.props.comments}
            onDeleteComment={this.handleDeleteComment.bind(this)} />
        )
    }
}
const mapStateToProps = (state) => {
  return {
    comments: state.comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // 提供给 CommentListContainer
    // 当从 LocalStorage 加载评论列表以后就会通过这个方法
    // 把评论列表初始化到 state 当中
    initComments: (comments) => {
        dispatch(initComments(comments))
    },
    // 删除评论
    onDeleteComment: (commentIndex) => {
        dispatch(deleteComment(commentIndex))
    },
    // 测试after删除
    onAfterDeleteComment: (comment) => {
        dispatch(afterDeleteComment(comment))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentListContainer)