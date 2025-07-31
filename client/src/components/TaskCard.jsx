import React from 'react';
import { Card, Stack } from 'react-bootstrap';
import StatusBadge from './Badge.jsx';
import DateContainer from './DateContainer.jsx';

function TaskCard({ task, index }) {
  const { status, taskName, taskDetails, dueDate } = task;

  return (
    <Card
      key={task._id || index}
      className='h-100 bg-transparent shadow-lg'
      style={{ width: '16rem', height: '24rem' }}
    >
      <Card.Header>
        <Stack
          direction='horizontal'
          gap={3}
          className='justify-content-between'
        >
          <div>T-{index}</div>
          <StatusBadge status={status} id={task._id} />
        </Stack>
      </Card.Header>

      <Card.Body>
        <Card.Title>{taskName}</Card.Title>
        <Card.Text>{taskDetails}</Card.Text>
      </Card.Body>

      <Card.Footer className='text-end'>
        <DateContainer
          id={task._id}
          dueDate={dueDate}
          status={status}
          taskName={taskName}
          taskDetails={taskDetails}
        />
      </Card.Footer>
    </Card>
  );
}

export default TaskCard;
