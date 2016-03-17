var Item = React.createClass({
      displayName: 'Item',
      getInitialState: function getInitialState() {

      	return {itemProp: this.props.itemProp, list: this.props.list}
      }, 

      handleCheckbox: function handleCheckbox() {
      	this.props.itemProp.completed = !this.props.itemProp.completed; 
      	this.props.list.props.main.forceUpdate(); 


      },

      deleteItem: function deleteItem(key) {
      	var main = this.props.list.props.main;
      	delete main.state.lists[main.state.currentList].items[this.props.itemProp.key];
      	main.forceUpdate(); 
      },

      componentDidMount: function componentDidMount() {
      	React.findDOMNode(this.refs.completedBox).checked = this.props.itemProp.completed; 
      },



      render: function render() {
        return React.createElement(
          'li',
          null,
          React.createElement(
          	'p',
          	null,
          	"Name: ",
          	this.props.itemProp.title
          	),
          React.createElement(
          	'p',
          	null,
          	"Description: ",
          	this.props.itemProp.description
          	), 
          React.createElement('p', null, "Completed ", React.createElement(
          	'input', {type:'checkbox', ref: 'completedBox', onChange: this.handleCheckbox, value: this.props.itemProp.title, name: "completeBox"})),
          React.createElement('button', {type: 'button', onClick: this.deleteItem}, "Delete")
          
        );
      }
    });
