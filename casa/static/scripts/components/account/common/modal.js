import React from 'react';

const ModalHeader = React.createClass({
	render: function(){
		return(
			<div className="modal-header">
				<div className="btn-group pull-left">
					<button className="btn btn-danger" data-dismiss="modal">
						Cancel
					</button>
				</div>
				<div className="btn-group pull-right">
					<button type="submit" className="btn btn-success">
						Save
					</button>
				</div>
				{ this.props.title }
			</div>
		);
	}
});

const ModalBody = React.createClass({
	render: function(){
		return(
			<div className="modal-body">
				{ this.props.content }
			</div>
		);
	}
});

const ModalFooter = React.createClass({
	render: function(){
		return(
			<div className="modal-footer">
				<small className="pull-left">Settle down</small>
			</div>
		);
	}
});

module.exports = {
	Header: ModalHeader,
	Body: ModalBody,
	Footer: ModalFooter
}