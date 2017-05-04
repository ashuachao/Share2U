import React, { Component } from 'react'
import Comment from './Comment';
export default class CommentList extends Component {
    handleDeleteComment(index) {
        if (this.props.onDeleteComment) {
            this.props.onDeleteComment(index)
        }
    }
    render() {
        const comments = this.props.comments || [];
        return (
            <div>
                {comments.map((item, i) => 
                    <Comment 
                        comment={item} 
                        key={i}
                        index={i}
                        onDeleteComment={this.handleDeleteComment.bind(this)}
                    >
                    </Comment>)}
            </div>
        )
    }
}