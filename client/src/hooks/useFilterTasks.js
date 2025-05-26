import React, { useContext } from 'react';

import { FilterTasksContext } from '../context/context.js';

export const useFilterTasks = () => useContext(FilterTasksContext);
