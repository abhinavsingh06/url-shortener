import React, { Component } from 'react';

export class CategoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = { categories: [{ name: '', color: '' }] };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ categories: { [event.target.name]: event.target.value } });
  }

  onSubmit(name, index) {
    const url = `/api/v1/categories/${name}`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('[name="csrf-token"]').content,
      },
      body: JSON.stringify({
        categories: [
          {
            name: this.state.categories.name,
            color: this.state.categories.color,
          },
        ],
      }),
    })
      .then(res => res.json())
      .then(res => this.setState({ categories: res.categories }));
  }

  render() {
    const { categories } = this.props;
    return (
      <React.Fragment>
        <form onSubmit={this.onSubmit}>
          <div class="form-row align-items-center">
            <div class="col-auto">
              <label class="sr-only" htmlFor="inlineFormInput">
                Category
              </label>
              <input
                type="text"
                name="name"
                class="form-control mb-2"
                id="inlineFormInput"
                value={this.state.name}
                onChange={this.handleChange}
                placeholder="Enter category"></input>
            </div>
            <div className="col-auto">
              <input
                name="color"
                type="color"
                value={this.state.color}
                onChange={this.handleChange}></input>
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
