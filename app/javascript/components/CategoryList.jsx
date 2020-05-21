import React, { Component } from 'react';
import CategoryForm from './CategoryForm';

export class CategoryList extends Component {
  render() {
    return (
      <>
        <table class="table table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Category name</th>
              <th scope="col">Edit category</th>
              <th scope="col">Delete category</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
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
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
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
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
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
          </tbody>
        </table>
      </>
    );
  }
}

export default CategoryList;
