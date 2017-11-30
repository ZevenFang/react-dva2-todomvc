import React, { Component } from 'react';

export default class Header extends Component {

  handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.target.value.length > 0) {
      this.props.onSubmit(e.target.value);
      e.target.value = '';
    }
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          onKeyPress={this.handleKeyPress}
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
        />
      </header>
    );
  }
}
