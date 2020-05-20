import React, { Component } from 'react';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';

export class Category extends Component {
  render() {
    return (
      <>
        <div className="container">
          <div className="d-flex justify-content-center m-3">
            <CategoryForm />
          </div>
          <div className="w-60 p-3">
            <CategoryList />
          </div>
        </div>
      </>
    );
  }
}

export default Category;
