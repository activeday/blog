import React from 'react';
import { editApartment } from './api/api';

const Apartments = React.createClass({
	getInitialState: function(){
		return ({data: []});
	},
	loadListingFromServer: function(){
		$.ajax({
			url: 'http://127.0.0.1:8000/apartments/?format=json',
			type: 'get',
			dataType: 'json',
			cache: false,
			data: { more: 'loadlisting' },
			success: function(result){
				this.setState({data: result});
			}.bind(this),
			error: function(xhr, status, error){
				console.error('',status, error.toString());
			}.bind(this)
		});
	},
	componentDidMount: function(){
		this.loadListingFromServer();
	},
	render: function(){
		console.log(this.state.data.length);
		return(
			<div>
				<ApartmentList data={ this.state.data } />
			</div>
		);
	},

});


const Apartment = React.createClass({
	componentDidMount: function(){
		editApartment();
	},
	render: function(){
		return(
			<div className="panel panel-default">
				<div className="panel-heading clearfix">
					<h3 className="panel-title pull-left">Apartment listing</h3>
					<EditButton />
				</div>
				<div className="list-group">
					<div className="list-group-item">
						<p className="list-group-item-text"> Name </p>
						<h4 class="list-group-item-heading">{ this.props.data.name }</h4>
					</div>
					<div className="list-group-item">
						<p className="list-group-item-text"> Location </p>
						<h4 class="list-group-item-heading">{ this.props.data.county }, { this.props.data.location }</h4>
					</div>
					<div className="list-group-item">
						<p className="list-group-item-text"> Type </p>
						<h4 class="list-group-item-heading">{ this.props.data.sdtype }</h4>
					</div>
					<div className="list-group-item">
						<p className="list-group-item-text"> Rent </p>
						<h4 class="list-group-item-heading">{ this.props.data.rent }</h4>
					</div>
					<div className="list-group-item">
						<p className="list-group-item-text"> Description </p>
						<h4 class="list-group-item-heading">{ this.props.data.description }</h4>
					</div>
				</div>
			</div>
		);	
	},
});

const ApartmentList = React.createClass({
	render: function(){
		var apartmentNodes = this.props.data.map(function(apartment, index){
			return(
				<div className="col-md-6 col-xs-6" key={ apartment.id }>
					<Apartment data={apartment} />
				</div>
			);
		});
		return(
			<div>
				{ apartmentNodes }
			</div>
		);
	}
});

const EditButton = React.createClass({
	render: function(){
		return(
			<div>
				<button className="btn btn-default pull-right">
					<i className="fa fa-pencil"></i>
					Edit
				</button>
			</div>
		);
	}

});

export default Apartments;