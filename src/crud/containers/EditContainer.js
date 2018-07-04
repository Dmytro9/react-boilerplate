import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import InputsSection from '../components/InputsSection'
import { getItemRequest } from '../actions/getItem'
import itemChange from '../actions/itemChange'
import { deleteRequest } from '../actions/deleteItem'
import { editItemRequest } from '../actions/editItem'
import { application } from '../models'

class EditContainer extends Component {
  static propTypes = {
    match: PropTypes.shape({
      path: PropTypes.string,
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }).isRequired,
    className: PropTypes.string.isRequired,
    data: PropTypes.shape(application.propTypes).isRequired,
    getItemRequest: PropTypes.func.isRequired,
    editItemRequest: PropTypes.func.isRequired,
    deleteRequest: PropTypes.func.isRequired,
    itemChange: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      modal: false,
    }
  }


  componentDidMount() {
    if (this.props.data === undefined
      || this.props.data.id === ''
      || this.props.data.id !== this.props.match.params.id) {
      this.props.getItemRequest(this.props.match.params.id)
    }
  }

  textFieldChange = (name, value) => {
    this.props.itemChange({
      application: {
        ...this.props.data,
        [name]: value,
      },
    })
  }

  toggleDialog = () => {
    this.setState({ modal: !this.state.modal })
  }

  deleteItem = () => {
    this.props.deleteRequest(this.props.data.id)
    this.toggleDialog()
  }

  editItem = () => {
    const { id, ...itemToSend } = this.props.data
    this.props.editItemRequest(id, itemToSend)
  }

  render() {
    return (
      <div>
        <div>Edit Container</div>
        {(this.props.data !== undefined
          && this.props.data.id !== ''
          && this.props.data.id === this.props.match.params.id) ? (
            <div>
              <InputsSection item={this.props.data} textFieldChange={this.textFieldChange} />
              <Row style={{ paddingTop: 30 }}>
                <Col md={{ size: 6 }}><Button color='danger' onClick={this.toggleDialog}>Delete</Button></Col>
                <Col md={{ size: 3 }}><Button color='primary' onClick={this.editItem}>Save</Button></Col>
              </Row>
            </div>)
          : null
        }
        <Modal isOpen={this.state.modal} className={this.props.className}>
          <ModalHeader>Delete</ModalHeader>
          <ModalBody>
            Do you realy want to delete this item?
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={this.deleteItem}>Delete</Button>
            <Button color='secondary' onClick={this.toggleDialog}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.crud.item.data.application,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getItemRequest,
  itemChange,
  deleteRequest,
  editItemRequest,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EditContainer)
