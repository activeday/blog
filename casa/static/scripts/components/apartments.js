var Apartments = React.createClass({
	loadApartmentsFromServer: function(){
		$.ajax({
			url: 'http://127.0.0.1:8000/apartments/?format=json',
			type: "get",
			dataType: 'json',
			cache: false,
			success: function(result){
				console.log(result);
				this.setState({apartments: result});
			}.bind(this),
			error: function(xhr, status, error){
				console.error('', status, error.toString());
			}.bind(this),
		});
	},
	getInitialState: function(){
		return ({apartments: []});
	},
	componentDidMount: function(){
		this.loadApartmentsFromServer();
	},
	render: function(){
		return(
			<div>
				<br></br>
				<br></br>
				<ApartmentList data={ this.state.apartments }/>
			    <button className="btn btn-default btn-block"> Load more </button> 
			</div>
		);
	}
});

var OpenModalButton = React.createClass({
	showModal: function(){
		$(this.refs.modal.getDOMNode()).modal();
	},
	render: function(){
		return(
			<div>
				<div className="pull-right">
					<button href="#" className="btn btn-default" onClick={ this.showModal }>
						<i className="fa fa-plus"></i>
						Add your listing
					</button>
				</div>
				<ApartmentAddModal ref="modal" />
			</div>
		);
	}
});
var ApartmentList = React.createClass({
	render: function(){
		var apartmentNodes = this.props.data.map(function(apartment){
			return(
				<a href="#" className="list-group-item" key={ apartment.id }>
					<Apartment data={ apartment } />
				</a>
			);
		});
		return(
			<div>
				<div className="bootcards-list">
					<div className="panel panel-default">
						<div className="list-group">
							{ apartmentNodes }
						</div>
					</div>
				</div>
			</div>
		);
	}
});
var Apartment = React.createClass({
	render: function(){
		return(
			<div className="row">
				<div className="col-sm-6">
					<img src="/static/images/apple-iphone-smartphone-desk.jpg" className="img-rounded pull-left"></img>
			        <h4 className="list-group-item-heading">{ this.props.data.name }</h4>
			        <p className="list-group-item-text">{ this.props.data.county }, { this.props.data.location }</p>
				</div>
				<div className="col-sm-6">
			        <h4 className="list-group-item-heading">Type: { this.props.data.sdtype }</h4>
			        <p className="list-group-item-text">Monthly rent: { this.props.data.rent }</p>
				</div>
			</div>
			
		);
	},
});

/*var ApartmentAddModal = React.createClass({
	render: function(){
		return(
			<div id="newListingModal" className="modal fade" role="dialog">
				<div className="modal-dialog">

					<div className="modal-content">
					</div>

				</div>
			</div>
		);
	}
});
var SaveApartmentForm = React.createClass({
	render: function(){
		return(
			<form className="form-horizontal">
				<ModalHeader title="New Listing"/>
				<div className="modal-body">
					<div className="form-group">
						<label className="col-xs-3 control-label">Name</label>
						<div className="col-xs-9">
							<input type="text" className="form-control" placeholder="Do your apartments have a name??"></input>
						</div>
					</div>
					<div className="form-group">
						<label className="col-xs-3 control-label">Type</label>
						<div className="col-xs-9">
							<select className="form-control" name="sdtype">
								<option></option>
								<option>Single room</option>
								<option>Servant quater</option>
								<option>Bed sitter</option>
								<option>One bedroom</option>
								<option>Two bedroom</option>
								<option>Three bedroom</option>
								<option>Other(Describe in the description section)</option>
							</select>
						</div>
					</div>
					<div className="form-group">
						<label className="col-xs-3 control-label">Monthly rent</label>
						<div className="col-xs-9">
							<div className="input-group">
								<span className="input-group-addon" id="basic-addon1">Kshs</span>
								<input type="number" name="rent" className="form-control" aria-describedby="basic-addon1"></input>
								<span className="input-group-addon">.00</span>
							</div>
						</div>
					</div>
					<div className="form-group">
						<label className="col-xs-3 control-label">County</label>
						<div className="col-xs-9">
							<select name="county" data-modal-counties="true" className="form-control">
							</select>
						</div>
					</div>
					<div className="form-group">
						<label className="col-xs-3 control-label">Location</label>
						<div className="col-xs-9">
							<input type="text" name="location" className="form-control" placeholder="where are your apartments located?"></input>
						</div>
					</div>
					<div className="form-group">
						<label className="col-xs-3 control-label">Image</label>
						<div className="col-xs-9">
							<input type="file" name="image"></input>
							<button className="btn btn-default" data-type="image-upload">
								<i className="fa fa-upload" aria-hidden="true"></i>
								upload photo 
							</button>
							<img src="" data-upload="listing-image" alt="no-image"></img>
						</div>
					</div>
				</div>
				<div className="form-group">
					<label className="col-xs-3 control-label">Description</label>
					<div className="col-xs-8">
						<textarea name="description" placeholder="small description about the apartments" className="form-control" rows="8" cols="15"></textarea>
					</div>
				</div>
				<ModalFooter />
			</form>

		);
	}
})*/
var ApartmentDetail = React.createClass({
	render: function(){
		return(
			<div>
				<div className="panel panel-default bootcards-media">
					<div className="panel-heading">
						<h3> Apartment </h3>
					</div>
					<div className="panel-body">
						<p className="text-muted">This is an awesome house </p>
					</div>
					<img src="/static/images/apple-iphone-smartphone-desk.jpg" width="100px" height="100px"></img>
					<div className="panel-footer">
						<div className="btn-group btn-group-justified">
							<div className="btn-group">
								<button className="btn btn-default">
									<i className="fa fa-arrow-down"></i>
									more details
								</button>
							</div>
							<div className="btn-group">
								<button className="btn btn-default">
									<i className="fa fa-star"></i>
									favorite
								</button>
							</div>
							<div className="btn-group">
								<button className="btn btn-default">
									<i className="fa fa-envelope"></i>
									email
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	},
});

ReactDOM.render(
	<Apartments />, document.getElementById('homes-list')
);