var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var CommentBox = React.createClass({
	commentsArray: [],
	getMoreComments: 'http://127.0.0.1:8000/comments/?format=json',
	loadCommentsFromServer: function(){
		$.ajax({
			url: this.getMoreComments,
			dataType: 'json',
			cache: false,
			success: function(result){
				this.getMoreComments = result['next'];
				this.commentsArray = this.commentsArray.concat(result['results'])
				this.setState({data: this.commentsArray});
			}.bind(this),
			error: function(xhr, status, error){
				console.error('',status, error.toString());
			}.bind(this)
		});
	},
	handleCommentSubmit: function(comment){
		$.ajax({
			url: 'http://127.0.0.1:8000/comments/',
			dataType: 'json',
			type: 'POST',
			data: comment,
			success: function(result){
				this.commentsArray[0] = result;
				this.setState({data: this.commentsArray});
			}.bind(this),
			error: function(xhr, status, err){
				console.log(comment.id + " " + comment.author + " " + comment.text)
				


				
			}.bind(this)
		});
	},
	getInitialState: function(){
		return ({data:[] });
	},
	componentDidMount: function(){
		this.loadCommentsFromServer();
	},
	render: function(){
		return(
			<div>
				<h1 className="w3-green"><u>Comments </u></h1>
					<CommentList data={this.state.data} />
					<button type="button" className="w3-btn-block w3-green" onClick={this.loadCommentsFromServer}>Load more</button>
					<hr/>
				<CommentForm onCommentSubmit={this.handleCommentSubmit}/>
			</div>
		);
	}
});

var CommentList = React.createClass({
	render: function(){
		var commentNodes = this.props.data.map(function(comment){
			return(
				<div className="col-md-4 col-xs-12" key={comment.id}>
				 	<Comment author={comment.author}> {comment.text} </Comment>
				</div>
			);
	    });
	    return(
		    <div className ="row">
			    <ReactCSSTransitionGroup transitionName={{enter:"animated", enterActive:"slideInUp", leave: "animated", leaveActive:"tada"}} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
		             { commentNodes }
		         </ReactCSSTransitionGroup>    
		    </div>
	    );
	}
});

var CommentForm = React.createClass({
	getInitialState: function(){
		return {author: '', text: ''};
	},
	handleAuthorChange: function(event){
		this.setState({author: event.target.value});
	},
	handleTextChange: function(event){
		this.setState({text: event.target.value});
	},
	handleSubmit: function(event){
  		event.preventDefault();
  		
  		var new_author = this.state.author.trim();
  		var new_text = this.state.text.trim();
  		if(!new_text || !new_author){
  			return;
  		}
  		this.props.onCommentSubmit({author: new_author, text: new_text})
  		this.setState({author: '', text: ''});
	},
	render: function(){
		return(
			<div className="w3-card-4">
				<div className="w3-container w3-green">
					<h4> Add Comment </h4>
				</div>
				<form className="w3-container" onSubmit={this.handleSubmit}>
					<input type="text" placeholder="Your name" className="w3-input w3-animate-input" onChange={ this.handleAuthorChange } value={ this.state.author}/>
					<input type="text" placeholder="Your comment" className="w3-input w3-animate-input" onChange={ this.handleTextChange } value={ this.state.text }/>
					<input type="submit" value="Post" className="w3-btn w3-green w3-hover-white"/>
				</form>
			</div>
		);
	}
});
var Comment = React.createClass({
	animateComment: function(ev){
		var hovered = $(ev.target).parent();
		hovered.addClass('animated shake');
		setTimeout(function(){
			hovered.removeClass('animated shake')
		}, 2000);

	},
	render: function(){
		return(
			<div>
				<div className="w3-card-4">
					<header className="w3-container w3-green">
						<h3>{ this.props.author}</h3>
					</header>
					<p className="text-muted"> { this.props.children} </p>
					<button type="button" className="w3-center w3-btn w3-green w3-hover-white" onMouseOver={ this.animateComment }>View more </button>
				</div>
				<hr />
			</div>
		);
	}
});
ReactDOM.render(
	<CommentBox />,
	document.getElementById('homes-list')
);