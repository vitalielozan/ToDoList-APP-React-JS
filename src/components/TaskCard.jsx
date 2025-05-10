import React from 'react';
import { Card, Stack } from 'react-bootstrap';
import StatusBadge from './Badge';
import DateContainer from './DateContainer';

function TaskCard(props) {
  return (
    <Card
      className="h-100 bg-transparent shadow-lg"
      style={{ width: '16rem', height: '24rem' }}
    >
      <Card.Header>
        <Stack
          direction="horizontal"
          gap={3}
          className="justify-content-between"
        >
          <div>T-{props.id}</div>
          <StatusBadge
            status={props.status}
            onStatusChange={(newStatus) =>
              props.onStatusChange(props.id, newStatus)
            }
          />
        </Stack>
      </Card.Header>

      <Card.Body>
        <Card.Title>{props.taskName}</Card.Title>
        <Card.Text>{props.taskDetails}</Card.Text>
      </Card.Body>

      <Card.Footer className="text-end">
        <DateContainer
          id={props.id}
          dueDate={props.dueDate}
          status={props.status}
          taskName={props.taskName}
          taskDetails={props.taskDetails}
          onTaskDeleted={props.onTaskDeleted}
          onTaskEdited={props.onTaskEdited}
        />
      </Card.Footer>
    </Card>
  );
}

export default TaskCard;
