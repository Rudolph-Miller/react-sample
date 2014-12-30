var comments = [
    {author: "Tom", text: "This is one comment."},
    {author: "Peter", text: "This is another comment."}
];

var CommentBox = React.createClass({
    getInitialState: function () {
        return {data: []};
    },

    loadCommentsFromServer: function() {
        /*
           Loading comments from server.

           var self = this;
           $.ajax({
               url: this.props.url,
               dataType: 'json'
           }).success(function (data) {
               self.setState({data: data});
           }).error(function (xhr, status, err) {
               console.error(self.props.url, status, err.toString());
           });
        */
        this.setState({data: comments});
    },

    componentDidMount: function () {
        this.loadCommentsFromServer();
        /*
           Loading from server when some time spent.

           setInterval(this.loadCommentsFromServer, this.props.pollInterval);
        */
    },
    
    handleCommentSubmit: function (comment) {
        var comments = this.state.data;
        var newComments = comments.concat([comment]);
        this.setState({data: newComments});
        /*
           Send comment to server

           var self = this;
           $.ajax({
               url: this.props.url,
               dataType: 'json',
               type: 'POST',
               data: comment
           }).success(function (data) {
               self.setState({data: data});
           }).error(function (xhr, status, err) {
               console.error(self.props.url, status, err.toString());
           });
        */
    },
    
    render: function () {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data}/>
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
});

var CommentList = React.createClass({
    render: function () {
        var commentNodes = this.props.data.map(function (comment) {
            return (
                <Comment author={comment.author}>
                    {comment.text}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});

var Comment = React.createClass({
    render: function () {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                {this.props.children}
            </div>
        );
    }
});


var CommentForm = React.createClass({
    handleSubmit: function (e) {
        e.preventDefault();
        var author = this.refs.author.getDOMNode().value.trim();
        var text = this.refs.text.getDOMNode().value.trim();
        if (!text || !author) {
            return;
        }
        // TODO: send
        this.props.onCommentSubmit({author: author, text: text});
        this.refs.author.getDOMNode().value = '';
        this.refs.text.getDOMNode().value = '';
        return;
    },
    
    render: function () {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Your name" ref="author" />
                <input type="text" placeholder="Say something..." ref="text" />
                <input type="submit" value="Post" />
            </form>
        );
    }
});

React.render(
    <CommentBox url="comments.json" />,
    document.getElementById('content')
);
