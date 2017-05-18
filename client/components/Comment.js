//ComponentWillRecieveProps -> shouldComponentUpdate -> ComponentWillMount -> render -> ComponentDidMount
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import React, {Component} from 'react';

export default class Comment extends Component {
    constructor() {
        super();
        this.state = {
            timeString: ''
        }
    }
    // componentWillMount() {
    //     this._updateTimeString();
    //     this._timer = setInterval(
    //         this._updateTimeString.bind(this), 
    //         5000
    //     )
    // }
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('------------------------->ssssssss')
    //     if (nextProps.comment.username == this.props.comment.username) {
    //         return false;
    //     }
    //     return true
    // }
    // componentWillUnmount() {
    //     clearInterval(this._timer);
    // }
    _updateTimeString() {
        const comment = this.props.comment;
        const duration = (+Date.now() - comment.createTime) / 1000;
        this.setState({
            timeString: duration > 60 ? `${Math.round(duration/60)}分钟前`: `${Math.round(Math.max(duration, 1))} 秒前` 
        })
    }
    handleDeleteComment() {
        if (this.props.onDeleteComment) {
            this.props.onDeleteComment(this.props.index);
        }
    }
    _getProcessedContent(content) {
        return content
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;")
            .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
    }
    render() {
        console.log('render comment')
        return (
            <div className='comment'>
                <div className='comment-user'>
                    <span>{this.props.comment.username}</span>
                    <p dangerouslySetInnerHTML={{
                        __html: this._getProcessedContent(this.props.comment.content)
                    }} />
                    <span>
                        {this.state.timeString}
                    </span>
                    <span onClick={this.handleDeleteComment.bind(this)}>删除</span>
                </div>
            </div>
        )
    }
}