import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import PostFeed from './PostFeed';
import { getPosts } from '../../actions/postActions';

class Posts extends Component{
	componentDidMount() {
		this.props.getPosts();
	}
	render() {
		const { posts } = this.props.post;
		let postContent;

		if(posts !== null) {
			postContent = <PostFeed posts={posts} />
		}
		else {
			console.log('there is no posts yet');
		}

		return(
			<div className="feed">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<PostForm />
							{postContent}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Posts.propTypes = {
	post: PropTypes.object.isRequired,
	getPosts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	post: state.post
})

export default connect(mapStateToProps, {getPosts})(Posts);