import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
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
                <CSSTransitionGroup
                        transitionName="example"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}
                        transitionAppear={true}
                        transitionAppearTimeout={500}>
                {comments.map((item, i) => 
                    <Comment 
                        comment={item} 
                        key={i}
                        index={i}
                        onDeleteComment={this.handleDeleteComment.bind(this)}
                    >
                    </Comment>)}
               </CSSTransitionGroup>
            </div>
        )
    }
}