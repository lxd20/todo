 var TodoMain = React.createClass({
      displayName: 'TodoMain',

      getInitialState: function getInitialState() {
      	var newList = {0: {key: 0, title: "List1", index: 0, description: "Do this", items: {}}, 
      				   1: {key: 1, title: "List2", index: 0, description: "No do this", items: {}}};
        return { lists: {}, 
        		index: 0, 
        		currentList: 0, 
        		listKeyArray: [], 
        		view: ['welcome', 'lists', 'items'], 
        		currentView: 'lists'};
      },

      addNewList: function addNewList(list) {
      	this.state.lists[this.state.index] = {key: this.state.index, title: list.title, index: 0, description: list.description, items:{}};
      	this.state.listKeyArray.push(this.state.index);
      	this.state.index = this.state.index + 1; 
		this.forceUpdate();      	
      },


      addNewItem: function addNewItem(item) {
      	this.state.lists[this.state.currentList].items[this.state.lists[this.state.currentList].index] = {key: this.state.lists[this.state.currentList].index, title: item.title, description: item.description, completed: false};
      	this.state.lists[this.state.currentList].index = this.state.lists[this.state.currentList].index + 1; 
      	this.forceUpdate();
      },

      createLists: function createLists(key) {
      	var listProp = this.state.lists[key]; 
		return React.createElement('div', 
		          	null, 
		          	React.createElement(
		            	List,
		            	{listProp: listProp, main: this}
		          	)
		          );
      },

     
      render: function render() {
     	if (this.state.currentView == 'items'){
	        return React.createElement(
	          'div',
	          null,
	          this.createLists(this.state.currentList),
	          React.createElement(FormHandler, { onFormSubmit: this.addNewItem, onListSubmit: this.addNewList, main: this, titleHeader: 'Item Title', descriptionHeader: 'Item Description'})
	        );
	    } else if (this.state.currentView == 'lists') {
	    	return React.createElement(
	    	'div',
	    	 null,
	       	React.createElement(TodoHeader, null), 
	        Object.keys(this.state.lists).map(this.createLists),
	         React.createElement(FormHandler, { onFormSubmit: this.addNewItem, onListSubmit: this.addNewList, main: this, titleHeader: 'List Title', descriptionHeader: 'List Description'})
	        );

	    } else {
	    	return React.createElement(
	    		'div', 
	    		null,
	    		'Welcome!'
	    		);

	    }
      }
    });