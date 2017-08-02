import React, {Component} from 'react'
import {Form, FormGroup, ControlLabel, FormControl, HelpBlock, Button, Row, Col} from 'react-bootstrap'

class AddForm extends Component {
  constructor (props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)

    this.state = {
      name: '',
      color: this.props.defaultSelectItem
    }
  }

  getValidationState () {
    const length = this.state.name.length
    const match = this.state.name.match(/^[A-Za-z0-9]{4,8}$/g)

    if (length >= 4 && length <= 8) {
      if (match) {
        return 'success'
      } else {
        return 'error'
      }
    } else {
      return 'error'
    }
  }

  onSubmit (e) {
    e.preventDefault()
    if (this.form.props.validationState === 'success') {
      const product = {
        name: this.state.name,
        color: parseInt(this.state.color)
      }
      this.props.onSubmit(product)

      this.setState({
        name: '',
        color: this.props.defaultSelectItem
      })
    }
  }

  onChange (e) {
    const name = e.target.name
    const value = e.target.value
    this.setState({ [name]: value })
  }

  render () {
    const colors = this.props.selectItems.map((color, i) => {
      return <option value={i} key={i}>{color}</option>
    })

    return (
      <div>
        <Form>
          <Row style={{display: 'flex'}}>
            <Col xs={6} md={6} lg={6}>

              <FormGroup controlId='formInlineName'
                validationState={this.getValidationState()}
                ref={(form) => { this.form = form }}>
                <ControlLabel>Name</ControlLabel>
                {'  '}
                <FormControl type='text'
                  name='name'
                  placeholder='apple'
                  value={this.state.name}
                  onChange={this.onChange} />
                <FormControl.Feedback />
                <HelpBlock>The name must contain 4-8 letters or numbers</HelpBlock>
              </FormGroup>

            </ Col>
            <Col xs={3} md={3} lg={3}>

              <FormGroup controlId='formControlsSelect'>
                <ControlLabel>Color</ControlLabel>
                {'  '}
                <FormControl componentClass='select'
                  placeholder='color'
                  name='color'
                  value={this.state.color}
                  onChange={this.onChange} >
                  {colors}
                </FormControl>
              </FormGroup>

            </Col>
            <Col xs={3} md={3} lg={3}>

              <Button type='submit'
                onSubmit={this.onSubmit}
                onClick={this.onSubmit}
                style={{
                  marginTop: '25px'
                }}
                block >
                Save
              </Button>

            </ Col>
          </ Row>
        </Form>
      </div>
    )
  }
}

export default AddForm
