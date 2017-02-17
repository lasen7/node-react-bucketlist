import React, { Component } from 'react';
import Comment from './Comment';

class CommentList extends Component {
  state = {
    isOpen: false
  };

  handleClick = () => {
    const {onGetComments, commentCount} = this.props;

    if (commentCount === 0) {
      return;
    }

    this.setState({
      isOpen: true
    });

    onGetComments();
  }

  render() {
    const {commentCount, comments} = this.props;
    const {isOpen} = this.state;

    const style = {
      cursor: 'pointer'
    };

    const commentList = comments.map(
      comment => (
        <Comment
          data={comment}
          key={comment._id}
        />
      )
    );

    return (
      <div className="comment-list">
        {!isOpen ?
          <span
            className="open-comment"
            style={commentCount === 0 ? {} : style}
            onClick={this.handleClick} >
            {commentCount === 0 ? '댓글 없음' : `댓글 ${commentCount}개 모두 보기`}
          </span>
          : undefined
        }
        {commentList}
        <div className="ui divider">
        </div>
      </div>
    );
  }
}

CommentList.propTypes = {
  onGetComments: React.PropTypes.func,
  comments: React.PropTypes.array,
  commentCount: React.PropTypes.number
};

export default CommentList;