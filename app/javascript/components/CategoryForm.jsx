import React, { Component } from 'react';

export class CategoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = { categories: [{ name: '', color: '' }] };
  }

  render() {
    const { categories } = this.props;
    return <React.Fragment></React.Fragment>;
  }
}

export default CategoryForm;
