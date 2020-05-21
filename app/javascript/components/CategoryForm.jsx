import React, { Component } from 'react';

export class CategoryForm extends Component {
  render() {
    return (
      <React.Fragment>
        <form>
          <div class="form-row align-items-center">
            <div class="col-auto">
              <label class="sr-only" for="inlineFormInput">
                Category
              </label>
              <input
                type="text"
                class="form-control mb-2"
                id="inlineFormInput"
                placeholder="Enter category"></input>
            </div>
            <div class="col-auto">
              <button type="submit" class="btn btn-primary mb-2">
                Add
              </button>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default CategoryForm;
