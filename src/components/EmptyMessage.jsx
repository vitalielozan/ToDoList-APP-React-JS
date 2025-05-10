import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';

function EmptyMessage(props) {
  const { onCreateTaskClick } = props;
  return (
    <Card
      className="m-auto px-5 bg-transparent rounded-3 shadow border-0 vh-50"
      style={{ width: '28rem' }}
    >
      <Card.Img variant="top" src="/task-icon.png" alt="task-icon" />
      <Card.Body>
        <Card.Title>No Tasks Yet</Card.Title>
        <Card.Text>Get productive. Creaste a task now.</Card.Text>
        <Button onClick={() => onCreateTaskClick(true)} variant="primary">
          Create Task
        </Button>
      </Card.Body>
    </Card>
  );
}

export default EmptyMessage;
