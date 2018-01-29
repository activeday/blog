var ModalHeader = React.createClass({
	render: function(){
		return(
			<h1>Boom </h1>
		);
	}
});

var ModalBody = React.createClass({
	render: function(){
		return(
			<div className="modal-body">
				{ this.props.content }
			</div>
		);
	}
})

var ModalFooter = React.createClass({
	render: function(){
		return(
			<div className="modal-footer">
				<small className="pull-left"> Settle down</small>
			</div>
		);
	}
})