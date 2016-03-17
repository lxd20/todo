var List = React.createClass({
      displayName: 'List',

      getInitialState: function getInitialState() {

      	return {listProp: this.props.listProp, main: this.props.main, currentView: "Normal", view: ["Normal", "Completed", "Not Completed"]}
      },

      createItem: function createItem(key) {

		var itemProp = this.props.listProp.items[key]; 

		return React.createElement(
			    Item,
			    {itemProp: itemProp, list: this}
		);


      }, 

      deleteList: function deleteList() {	
      	var main = this.props.main; 
      	delete main.state.lists[this.props.listProp.key];
      	var index = main.state.listKeyArray.indexOf(this.props.listProp.key); 
      	main.state.listKeyArray.splice(index,1);
      	main.state.currentList = main.state.listKeyArray[index % main.state.listKeyArray.length];
      	main.forceUpdate(); 

      },

      viewList: function viewList() {
      	 this.props.main.state.currentView = "items";
      	 this.props.main.state.currentList = this.props.listProp.key; 
      	 this.props.main.forceUpdate(); 
      },

      goBack: function goBack() {
         this.props.main.state.currentView = "lists";
      	 this.props.main.forceUpdate(); 

      }, 
      
      changeView: function changeView() {
      	this.state.currentView = this.state.view[React.findDOMNode(this.refs.viewSelector).selectedIndex];
      	this.state.main.forceUpdate(); 
      },


      filterView: function filterView(key) {
      	var itemProp = this.props.listProp.items[key];
      	if (this.state.currentView == 'Normal') {
      		return true;
      	} else if (this.state.currentView == 'Completed') {
      		return itemProp.completed;
      	} else {	
      		return !itemProp.completed; 
      	}


      },

      render: function render() {

      	if (this.props.main.state.currentView == 'items'){
        	return React.createElement(
        		'div',
        		null,
        		React.createElement('button', {type: 'button', onClick: this.goBack}, "Back"),
        		React.createElement('h4', null, this.props.listProp.title),
        		React.createElement('p', null, "Description: ", this.props.listProp.description), 
        		"View Options  ",
    			React.createElement('select', {ref: 'viewSelector', onChange: this.changeView}, 
    		 	React.createElement('option', {id: 'view0'}, 'Normal'),
    		 	React.createElement('option', {id: 'view1'}, 'Completed'),
    		 	React.createElement('option', {id: 'view2'}, 'Not Completed')
    		 	),
        		React.createElement(
            		'ul',
            		null,
            		Object.keys(this.props.listProp.items).filter(this.filterView).map(this.createItem)

        		)

        	);
      } else {
      	return React.createElement(
      		'div', 
      		null, 
      		this.props.listProp.title,
      		React.createElement('br', null), 
      		React.createElement('button', {type: 'button', onClick: this.viewList}, "View List"),
           React.createElement('button', {type: 'button', onClick: this.deleteList}, "Delete List")
      	);
      }

      }
    
    
    });