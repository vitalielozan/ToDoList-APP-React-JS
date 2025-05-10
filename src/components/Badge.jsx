import React, { useState } from 'react';
import { Badge, Form, Modal, Button } from 'react-bootstrap';

function StatusBadge(props) {
  const { status, onStatusChange } = props;
  const [show, setShow] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);

  const getVariant = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in-progress':
        return 'warning';
      case 'pending':
        return 'secondary';
      case 'to-do':
        return 'danger';
      default:
        return 'danger';
    }
  };

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setCurrentStatus(newStatus);
    onStatusChange?.(newStatus);
    setShow(false);
  };

  return (
    <>
      <Badge
        bg={getVariant(currentStatus)}
        onClick={() => setShow(true)}
        className="text-capitalize"
        style={{ cursor: 'pointer' }}
      >
        {currentStatus}
      </Badge>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Change Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select value={currentStatus} onChange={handleStatusChange}>
            <option value="to-do">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default StatusBadge;
