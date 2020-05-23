import React, { Component } from 'react';
import Header from '../components/Header';

export class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      formData: {
        name: '',
        color: '#ffffff',
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [name]: value,
      },
    });
  };

  onSubmit(event) {
    event.preventDefault();
    const url = `/api/v1/categories/`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('[name="csrf-token"]').content,
      },
      body: JSON.stringify(this.state.formData),
    })
      .then(res => res.json())
      .then(res =>
        this.setState({
          categories: [...this.state.categories, res.category],
          formData: { name: '', color: '' },
        })
      );
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
    const { categories } = this.state;
    {
      console.log(categories);
    }
    return (
      <>
        <Header />
        <div className="container">
          <div className="d-flex justify-content-center m-3">
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
                    value={this.state.formData.name}
                    onChange={this.handleChange}
                    placeholder="Enter category"></input>
                </div>
                <div className="col-auto">
                  <input
                    name="color"
                    type="color"
                    value={this.state.formData.color}
                    onChange={this.handleChange}></input>
                </div>
                <div class="col-auto">
                  <button type="submit" class="btn btn-primary mb-2">
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="w-60 p-3">
            {categories && (
              <table class="table table-dark">
                <thead>
                  <tr>
                    <th scope="col">Category name</th>
                    <th scope="col">Edit category</th>
                    <th scope="col">Delete category</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map(category => (
                    <tr key={category.id}>
                      <td>
                        <span style={{ color: category.color }}>
                          <a> {category.name}</a>
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
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Category;
