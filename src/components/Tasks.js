import React, { useEffect } from 'react';
import { Checkbox } from './Checkbox';
import { ReactivateTask } from './ReactivateTask';
import { AddTask } from './AddTask';
import { useTasks } from '../hooks';
import { collatedTasks } from '../constants';
import { getTitle, getCollatedTitle, collatedTasksExist } from '../helpers';
import { useSelectedProjectValue, useProjectsValue, useAuth } from '../context';

export const Tasks = () => {
    const { selectedProject } = useSelectedProjectValue();
    const { projects } = useProjectsValue();
    const { tasks, archivedTasks } = useTasks(selectedProject);
    const { currentUser } = useAuth();

    let projectName = '';

    if (collatedTasksExist(selectedProject) && selectedProject) {
        projectName = getCollatedTitle(collatedTasks, selectedProject).name;
    }

    if (
        projects &&
        projects.length > 0 &&
        selectedProject &&
        !collatedTasksExist(selectedProject)
    ) {
        projectName = getTitle(projects, selectedProject).name;
    }

    useEffect(() => {
        document.title = `${projectName}: Todoist`;
    });

    return (
        <div className="tasks" data-testid="tasks">
            <h4 data-testid="user-email">Hello, {currentUser.email}</h4>
            <h2 data-testid="project-name">{projectName}</h2>

            <ul className="tasks__list">
                {tasks.map((task) => (
                    <li key={`${task.id}`}>
                        <Checkbox id={task.id} taskDesc={task.task} />
                        <span>{task.task}</span>
                    </li>
                ))}
            </ul>

            <AddTask />

            <h4 className='tasks__archiveHeader'>---Archived</h4>
            <ul className="tasks__list tasks__archiveList">
                {archivedTasks.map((archivedTask) => (
                    <li key={`${archivedTask.id}`}>
                        <ReactivateTask id={archivedTask.id} taskDesc={archivedTask.task} />
                        <span>{archivedTask.task}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
