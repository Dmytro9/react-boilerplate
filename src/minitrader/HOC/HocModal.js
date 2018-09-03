import React, { Component } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'
import NestedModalBody from '../components/NestedModalBody'


const HocModal = ChildComponent => class HocComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modal: true,
      nestedModal: false,
    }
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    })
  }

  toggleNested = () => {
    this.setState({
      nestedModal: !this.state.nestedModal,
    })
  }


  render() {
    return (
      <Modal isOpen={this.state.modal} backdrop='static' className='quote-modal' autoFocus={false}>
        <ModalBody>
          <ChildComponent {...this.props} toggle={this.toggle} />
          <Modal
            isOpen={this.state.nestedModal}
            toggle={this.toggleNested}
            className='trader_nested-modal'
          >
            <ModalHeader>
              <strong>Terms and Conditions</strong>
              <div
                className='quote_close-btn'
                role='button'
                tabIndex={0}
                onClick={this.toggleNested}
                onKeyPress={this.toggleNested}
              >
                ✕
              </div>
            </ModalHeader>
            <ModalBody>
              <NestedModalBody />
            </ModalBody>
            <ModalFooter>
              <Button onClick={this.toggleNested}>OK</Button>
            </ModalFooter>
          </Modal>
        </ModalBody>
        <ModalFooter>
          <div>
            By clicking anywhere in the page, I agree to the terms and conditions specified{' '}
            <Button
              className='trader_nested-modal-link'
              onClick={this.toggleNested}
              onKeyPress={this.toggleNested}
            >
              here
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    )
  }
}

export default HocModal
