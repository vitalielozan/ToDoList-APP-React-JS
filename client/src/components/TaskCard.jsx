import React from 'react';
import { Card, Stack } from 'react-bootstrap';
import StatusBadge from './Badge';
import DateContainer from './DateContainer';

function TaskCard({
  id,
  status,
  taskName,
  taskDetails,
  dueDate,
  onTaskDeleted,
  onTaskEdited,
  onStatusChange,
}) {
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
          <div>T-{id}</div>
          <StatusBadge
            status={status}
            onStatusChange={(newStatus) => onStatusChange(id, newStatus)}
          />
        </Stack>
      </Card.Header>

      <Card.Body>
        <Card.Title>{taskName}</Card.Title>
        <Card.Text>{taskDetails}</Card.Text>
      </Card.Body>

      <Card.Footer className="text-end">
        <DateContainer
          id={id}
          dueDate={dueDate}
          status={status}
          taskName={taskName}
          taskDetails={taskDetails}
          onTaskDeleted={onTaskDeleted}
          onTaskEdited={onTaskEdited}
        />
      </Card.Footer>
    </Card>
  );
}

export default TaskCard;
