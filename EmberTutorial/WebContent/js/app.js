var App = Ember.Application.create({
	LOG_TRANSITIONS : true
});
App.Router.map(function() {
	this.route('about');
	this.route('credits', {
		path : "/thanks"
	});
	this.resource('products', function() {
		this.resource('product', {
			path : "/:product_id"
		});
	});
	this.resource('contacts', function() {
		this.resource('contact', {
				path : "/:contact_id"
		});
	});
});

App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.Product = DS.Model.extend({
	title : DS.attr(),
	price : DS.attr(),
	description : DS.attr(),
	isOnSale : DS.attr(),
	image : DS.attr()
});

App.Contact = DS.Model.extend({
	name : DS.attr(),
	avatar : DS.attr(),
	about : DS.attr()
});

App.Product.FIXTURES = [
		{
			id : 1,
			title : 'Flint',
			price : 99,
			description : 'Flint is a hard, sedimentary cryptocrystalline form of the mineral quartz, categorized as a variety of chert.',
			isOnSale : true,
			image : 'images/products/flint.png'
		},
		{
			id : 2,
			title : 'Kindling',
			price : 249,
			description : 'Easily combustible small sticks or twigs used for starting a fire.',
			isOnSale : false,
			image : 'images/products/kindling.png'
		} ];

App.Contact.FIXTURES = [
		{
			id: 1,
			name : 'Anostagia',
			avatar : 'images/contacts/anostagia.png',
			about : 'Knowing there was a need for it, Anostagia drew on her experience and spearheaded the Flint & Flame storefront. In addition to coding the site, she also creates a few products available in the store.'
		},
		{
			id: 2,
			name : 'Giamia',
			avatar : 'images/contacts/anostagia.png',
			about : 'Although Giamia came from a humble spark of lightning, he quickly grew to be a great craftsman, providing all the warming instruments needed by those close to him.'
		} ];

App.ContactsIndexController = Ember.Controller.extend({
	contactName : 'Anostagia',
	avatar : 'images/about/avatar.png',
	status : function() {
		return ((new Date()).getDay() == 0 ? 'Closed' : 'Open');
	}.property()
});

App.ProductsRoute = Ember.Route.extend({
	model : function() {
		return this.store.findAll('product');
	}
});

App.ProductRoute = Ember.Route.extend({
	model : function(params) {
		return this.store.find('product', params.product_id);
	}
});

App.ContactsRoute = Ember.Route.extend({
	model : function() {
		return this.store.findAll('contact');
	}
});

App.ContactRoute = Ember.Route.extend({
	model : function(params) {
		return this.store.find('contact', params.contact_id);
	}
});