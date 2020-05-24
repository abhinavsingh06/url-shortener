import React, { Component } from 'react';

export class CategoryEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editFormData: { name: '', color: '' },
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      editFormData: {
        ...this.state.editFormData,
        [name]: value,
      },
    });
  };

  onSubmit(event) {
    event.preventDefault();
    const url = `/api/v1/categories/${name}`;
    fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('[name="csrf-token"]').content,
      },
      body: JSON.stringify(this.state.editFormData),
    })
      .then(res => res.json())
      .then(res =>
        this.setState({
          categories: [...this.state.categories, res.category],
          editFormData: { name: '', color: '' },
        })
      );
  }

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.onSubmit}>
          <div className="form-row align-items-center">
            <div className="col-auto">
              <input
                type="text"
                className="form-control mb-2"
                id="inlineFormInput"
                name="name"
                placeholder="Edit category"
                value={this.state.editFormData.name}
                onChange={this.handleChange}></input>
            </div>
            <div className="col-auto">
              <input
                name="color"
                type="color"
                value={this.state.editFormData.color}
                onChange={this.handleChange}></input>
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
