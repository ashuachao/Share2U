import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CommentInput from '../components/CommentInput';
import { addComment } from '../reducers/comment';
// import Login from 'containers/Login/Login'
class CommentInputContainer extends Component {
    constructor() {
        super();
        this.state = {
            username: ''
        }
    }
    _loadUsername() {
		const username = localStorage.getItem('username');
		if (username) {
			this.setState({
				username
			})
		}
	}
    _saveUsername(name) {
        localStorage.setItem('username', name);   
	}
    handleSubmitComment(comment) {
        if (!comment) return
        if (!comment.username) return alert('请输入用户名')
        if (!comment.content) return alert('请输入评论内容')
        if (typeof window !== undefined) {
            const { comments } = this.props
            const newComments = [...comments, comment]
            localStorage.setItem('comments', JSON.stringify(newComments))
        }
        if (this.props.onSubmit) {
            this.props.onSubmit(comment)
        }
    }
	componentWillMount() {
        // 浏览器环境
		if (typeof window !== 'undefined') {
            this._loadUsername();
        }
	}
    render () {
        return (
            <CommentInput
                username={this.state.username}
                onUserNameInputBlur={this._saveUsername.bind(this)}
                onSubmit={this.handleSubmitComment.bind(this)} >
            </CommentInput>
        )
    }
}
// 不同的connect组件只要引入了相同的state,就会同步渲染
// connect组件内部对mapToProps进行前后比对,如果一样,则不做渲染
// 等于改变了props,触发了componentReceive -> shouleComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate
const mapStateToProps = (state) => {
  return {
      comments: state.comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (comment) => {
      dispatch(addComment(comment))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentInputContainer)
