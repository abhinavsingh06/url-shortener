import React, { Component } from 'react';

export class CategoryEditForm extends Component {
  render() {
    return (
      <React.Fragment>
        <form>
          <div className="form-row align-items-center">
            <div className="col-auto">
              <input
                type="text"
                className="form-control mb-2"
                id="inlineFormInput"
                placeholder="Edit category"></input>
            </div>
            <div className="col-auto">
              <input name="color" type="color"></input>
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary mb-2">
                Update
              </button>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default CategoryEditForm;
