import React from 'react'
import PropTypes from 'prop-types';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Radio,
  Button
} from 'react-bootstrap'

export default class ProductForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      values: {
        name: '',
        color: '',
      },
      validation: {
        name: null,
        color: 'success'
      },
      isValid: false
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmitButtonClick = this.onSubmitButtonClick.bind(this)
    this.validateForm = this.validateForm.bind(this)
    this.validateField = this.validateField.bind(this)
    this.checkFormIsValid = this.checkFormIsValid.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }

  onChange(e) {
    const value = e.target.value
    const field = e.target.getAttribute('name')
    const values = Object.assign({}, this.state.values, {[field]: value})

    this.setState({values})
  }

  onSubmitButtonClick(e) {
    e.preventDefault()

    this.validateForm(this.submitForm)
  }

  validateForm(submitCallback) {
    const {values} = this.state
    const result = {}

    Object.keys(values).forEach((field) => {
      result[field] = this.validateField(field)
    })

    this.setState({
      validation: result,
      isValid: this.checkFormIsValid(result)
    }, submitCallback)
  }

  validateField(field) {
    const value = this.state.values[field]
    switch (field) {
      case 'name':
        return /^[a-zA-Z0-9]{4,8}$/.test(value) ? 'success' : 'error'
      default:
        return 'success'
    }
  }

  checkFormIsValid(validation) {
    return Object.keys(validation)
      .every(field => validation[field] === 'success')
  }

  submitForm() {
    const {
      isValid,
      values
    } = this.state

    if (isValid) {
      this.props.onSubmit(values)
      this.setState({
        values: {name: '', color: values.color},
        validation: {name: null, color: 'success'},
        isValid: false
      })
    }
  }

  render() {
    const {
      values,
      validation
    } = this.state

    return (
      <form>
        <FormGroup
          controlId="formBasicText"
          validationState={validation.name}
        >
          <ControlLabel>Product name</ControlLabel>
          <FormControl
            type="text"
            name="name"
            value={values.name}
            placeholder="Enter text"
            onChange={this.onChange}
          />
          <HelpBlock
            className={`${validation.name === 'error' ? '' : 'hidden'}`}
          >
            4-8 characters, only numbers and letters allowed.
          </HelpBlock>
        </FormGroup>
        <FormGroup>
          <Radio onClick={this.onChange} value="red" name="color" inline>
            Red
          </Radio>
          {' '}
          <Radio onClick={this.onChange} value="green" name="color" inline>
            Green
          </Radio>
          {' '}
          <Radio onClick={this.onChange} value="blue" name="color" inline>
            Blue
          </Radio>
        </FormGroup>
        <FormGroup>
          <Button
            bsStyle="primary"
            bsSize="large"
            onClick={this.onSubmitButtonClick}
            disabled={!values.name}
            block
          >
            Create product
          </Button>
        </FormGroup>
      </form>
    )
  }
}

ProductForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}
