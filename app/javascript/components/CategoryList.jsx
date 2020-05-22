import React, { Component } from 'react';
import CategoryForm from './CategoryForm';

export class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    {
      console.log(this.props);
    }
    const { categories } = this.props;
    return (
      <>
        <table class="table table-dark">
          <thead>
            <tr>
              <th scope="col">Category name</th>
              <th scope="col">Edit category</th>
              <th scope="col">Delete category</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(({ name, id, color }) => (
              <tr key={id}>
                <td>
                  <span style={{ color: color }}>
                    <a> {name}</a>
                  </span>
                </td>
                <td>
                  <button type="button" class="btn btn-warning">
                    Edit
                  </button>
                </td>
                <td>
                  <button type="button" class="btn btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default CategoryList;
