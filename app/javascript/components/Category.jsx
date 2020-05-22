import React, { Component } from 'react';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';
import Header from '../components/Header';

export class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    const url = '/api/v1/categories';
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(response => this.setState({ categories: response.categories }))
      .catch(() => this.props.history.push('/'));
  }
  render() {
    return (
      <>
        <Header />
        <div className="container">
          <div className="d-flex justify-content-center m-3">
            <CategoryForm />
          </div>
          <div className="w-60 p-3">
            <CategoryList {...this.state} />
          </div>
        </div>
      </>
    );
  }
}

export default Category;
