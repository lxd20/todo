var FormHandler = React.createClass({
      displayName: 'FormHandler',

      getInitialState: function getInitialState() {
        return { title: '', description: '', main: this.props.main};
      },
      handleSubmit: function handleSubmit(e) {
        e.preventDefault();

        if (this.props.main.state.currentView == 'items') {
       		 this.props.onFormSubmit({title: this.state.title, description: this.state.description});
        } else {

        	this.props.onListSubmit({title: this.state.title, description: this.state.description});
        };
        this.setState({ title: '', description: '' });
        React.findDOMNode(this.refs.itemTitle).focus();
        return;
      },
      onChangeTitle: function onChangeTitle(e) {

        this.setState({
          title: e.target.value
        });

      },

      onChangeDescription: function onChangeTitle(e) {

        this.setState({
          description: e.target.value
        });


      },

      render: function render() {

        return React.createElement(
          'form',
          { onSubmit: this.handleSubmit },
          React.createElement('p', null, this.props.titleHeader),
          React.createElement('input', { type: 'text', ref: 'itemTitle', onChange: this.onChangeTitle, value: this.state.title, name: "Title" }),
          React.createElement('p', null, this.props.descriptionHeader),
          React.createElement('input', { type: 'text', ref: 'itemDescription', onChange: this.onChangeDescription, value: this.state.description, name: "Description" }),
          React.createElement('input', { type: 'submit', value: 'Add' })
        );
      }
    });




