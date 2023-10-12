import React, { Component } from 'react';
import './EditButton.css';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

export class EditButton extends Component {
    static displayName = EditButton.name;

    constructor(props){
        super(props);
        this.state = { isModalOpen: false }
    }

    toggleModal = () => {
        this.setState({ isModalOpen: !this.state.isModalOpen });
    }

    render() {

        return <>
            <span className='edit-button' onClick={() => this.toggleModal()}>Edit</span>

            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} size="xl">
                <ModalHeader toggle={this.toggleModal}>
                    <div>Edit</div>          
                </ModalHeader>

                <ModalBody>
                    {this.props.children}
                </ModalBody>
            </Modal>
        </>
    }
}
