var data = [
    {author: "Tom", text: "This is one comment."},
    {author: "Peter", text: "This is another comment."}
];

var CommentBox = React.createClass({
    getInitialState: function () {
        return {data: []};
    },

    loadCommentsFromServer: function() {
        /*
           Loading from server.
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
        this.setState({data: this.props.data});
    },

    componentDidMount: function () {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    
    render: function () {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data}/>
                <CommentForm />
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
    render: function () {
        return (
            <div className="commentForm">
                Comment Form.
            </div>
        );
    }
});

React.render(
    <CommentBox url="comments.json" data={data} />,
    document.getElementById('content')
);
