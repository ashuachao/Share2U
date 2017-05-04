import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CommentInput from '../components/CommentInput';
import { addComment } from '../reducers/comment';

class CommentInputContainer extends Component {
    constructor() {
        super();
        this.state = { username: '' }
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
        console.log(1111);
        if (!comment) return
        if (!comment.username) return alert('请输入用户名')
        if (!comment.content) return alert('请输入评论内容')
        const { comments } = this.props
        const newComments = [...comments, comment]
        localStorage.setItem('comments', JSON.stringify(newComments))
        if (this.props.onSubmit) {
            this.props.onSubmit(comment)
        }
    }
	componentWillMount() {
		this._loadUsername();
        console.log('input mount111')
	}
    render () {
        return (
        <CommentInput
            username={this.state.username}
            onUserNameInputBlur={this._saveUsername.bind(this)}
            onSubmit={this.handleSubmitComment.bind(this)} />
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
    onSubmit: (comment) => {
      dispatch(addComment(comment))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentInputContainer)
