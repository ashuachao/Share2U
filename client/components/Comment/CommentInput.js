// import { Button } from 'antd-mobile'
import React, { Component, PropTypes} from 'react'
export default class CommentInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: props.username,
			content: ''
		}
	}
	handleUsernameChange(event) {
		this.setState({
			username: event.target.value
		})
		
	}
	handleContentChange(event) {
		this.setState({
			content: event.target.value
		})
	}
	handleSubmit() {
		if (this.props.onSubmit) {
			const {username, content} = this.state;
			this.props.onSubmit({
				username,
				content,
				// 变成毫秒级的表示
				createTime: +new Date()
			})
		}
		this.setState({
			content: ''
		})
	}
	handleUsernameBlur(event) {
		// this._saveUsername(event.target.value);
		if (this.props.onUserNameInputBlur) {
			this.props.onUserNameInputBlur(event.target.value);
		}
	}
	_saveUsername(name) {
		localStorage.setItem('username', name);
	}
	_loadUsername() {
		const username = localStorage.getItem('username');
		if (username) {
			this.setState({
				username
			})
		}
	}
	componentWillMount() {
		if (typeof window !== 'undefined') {
			this._loadUsername();
		}
	}
	handleImmutable() {
		this.setState({
			immutable: {
				data: 222
			}
		})
	}
	componentDidMount() {
		this.textarea.focus();
	}
	render() {
		return (
			<div className='comment-input'>
				<div className='comment-field'>
					<span className='comment-field-name'>用户名:</span>
					<div className='comment-field-input'>
						<input type="text" 
							value={this.state.username}
							onChange={this.handleUsernameChange.bind(this)}
							onBlur={this.handleUsernameBlur.bind(this)}
							ref={(input) => {this.input=input}}/>	
					</div>
				</div>
				<div className='comment-field'>
					<span className='comment-field-name'>评论:</span>
					<div className='comment-field-input'>
						<textarea 
							value={this.state.content}
							onChange={this.handleContentChange.bind(this)}
							ref={(textarea) => {this.textarea=textarea}}>
						</textarea>
					</div>
				</div>
				<div className='comment-field-button'>
					<input type='button' value='发布' onClick={this.handleSubmit.bind(this)} />
				</div>
				
				{this.props.children}
			</div>
		)
	}
}
CommentInput.propTypes = {
	onSubmit: PropTypes.func
}