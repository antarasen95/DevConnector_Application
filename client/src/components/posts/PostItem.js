import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike } from '../../actions/postActions';

class PostItem extends Component{

    onDeleteClick(id) {
      this.props.deletePost(id);

    }

    onLikeClick(id) {
      this.props.addLike(id);
    }

    onUnlikeClick(id){
      this.props.removeLike(id)
    }

    render() {
        const { post, auth } = this.props;
        return (
            <div className="card card-body mb-3">
            <div className="row">
            <div className="col-md-2">
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
                <button type="button" 
                  onClick={this.onLikeClick.bind(this, post._id)}
                  className="btn btn-light mr-1">
                  <i className="text-info fas fa-thumbs-up" />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button type="button" 
                  onClick={this.onUnlikeClick.bind(this, post._id)}
                  className="btn btn-light mr-1">
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
                {post.user === auth.user.id ? (
                  <button
                    type="button"
                    className="btn btn-danger mr-1"
                    onClick={this.onDeleteClick.bind(this, post._id)}
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
          </div>
        </div>
      </div>
        )
    }
}

PostItem.propTypes = {
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(PostItem);