import React, { Component } from 'react';
import { connect } from 'dva';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import TodoItem from '../components/TodoItem';
import styles from './IndexPage.css';

class IndexPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: 'All',
    };
  }

  addTask = (v) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'todo/add',
      row: {
        text: v,
        completed: false,
      },
    });
  };

  delTask = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'todo/del',
      id,
    });
  };

  updTask = (id, text) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'todo/upd',
      id,
      text,
    });
  };

  checkTask = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'todo/check', id,
    });
  };

  clearCompleted = () => {
    const { dispatch, todo } = this.props;
    const id = todo.data.filter(v => (v.completed)).map(v => (v._id));
    dispatch({
      type: 'todo/del', id,
    });
  };

  render() {
    let { data } = this.props.todo;
    const completedTask = data.filter(v => !v.completed);
    const { filter } = this.state;
    if (filter === 'Active') { data = data.filter(v => !v.completed); } else if (filter === 'Completed') { data = data.filter(v => v.completed); }
    return (
      <div>
        <section className="todoapp">
          <Header onSubmit={this.addTask} />
          {/* This section should be hidden by default and shown when there are todos */}
          <section className="main">
            <input className="toggle-all" type="checkbox" />
            <label htmlFor="toggle-all">
              Mark all as complete
            </label>
            <ul className="todo-list">
              {/* These are here just to show the structure of the list items */}
              {/* List items should get the class `editing` when editing and `completed` when marked as completed */}
              {data.map((v, k) => (
                <TodoItem key={k} id={k} todo={v} editTodo={this.updTask} deleteTodo={this.delTask} completeTodo={this.checkTask} />
              ))}
            </ul>
          </section>
          {/* This footer should hidden by default and shown when there are todos */}
          <footer className="footer">
            {/* This should be `0 items left` by default */}
            <span className="todo-count"><strong>{completedTask.length === 0 ? 'No' : completedTask.length}</strong> item{completedTask.length > 1 ? 's' : ''} left</span>
            {/* Remove this if you don't implement routing */}
            <ul className={`filters ${styles.filter}`}>
              <li onClick={() => this.setState({ filter: 'All' })}>
                <a className={filter === 'All' ? 'selected' : ''}>All</a>
              </li>
              <li onClick={() => this.setState({ filter: 'Active' })}>
                <a className={filter === 'Active' ? 'selected' : ''}>Active</a>
              </li>
              <li onClick={() => this.setState({ filter: 'Completed' })}>
                <a className={filter === 'Completed' ? 'selected' : ''}>Completed</a>
              </li>
            </ul>
            {/* Hidden if no completed items are left ↓ */}
            <button className="clear-completed" onClick={this.clearCompleted}>
              Clear completed
            </button>
          </footer>
        </section>
        <Footer />
      </div>
    );
  }

}

IndexPage.propTypes = {
};

export default connect(({ todo }) => ({ todo }))(IndexPage);
