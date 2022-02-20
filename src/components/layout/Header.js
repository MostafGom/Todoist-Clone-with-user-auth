import { useState } from 'react';
import { FaPizzaSlice, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context';
// import PropTypes from 'prop-types';
import { AddTask } from '../AddTask';

export const Header = ({ darkMode, setDarkMode }) => {
    const [shouldShowMain, setShouldShowMain] = useState(false);
    const [showQuickAddTask, setShowQuickAddTask] = useState(false);
    const [error, setError] = useState('');
    const { signout } = useAuth()
    const navigate = useNavigate()

    async function handleSignout() {
        try {
            setError('')
            await signout()
            navigate('/login')

        } catch (error) {
            setError("Failed To Sign Out")
        }
    }
    return (
        <header className="header" data-testid="header">
            <nav>
                <div className="logo">
                    <img src="/images/logo3anim.gif" alt="Todoist" />

                </div>
                <div className="settings">
                    <ul>
                        <li className="settings__add">
                            <button
                                data-testid="quick-add-task-action"
                                aria-label="Quick add task"
                                type="button"
                                onClick={() => {
                                    setShowQuickAddTask(true);
                                    setShouldShowMain(true);
                                }}
                            >
                                +
                            </button>
                        </li>
                        <li className="settings__darkmode">
                            <button
                                data-testid="dark-mode-action"
                                aria-label="Darkmode on/off"
                                type="button"
                                onClick={() => setDarkMode(!darkMode)}
                            >
                                <FaPizzaSlice />
                            </button>
                        </li>
                        <li className="settings__signout">
                            <button
                                data-testid="signout-action"
                                aria-label="signout"
                                type="button"
                                onClick={() => handleSignout()}
                            >
                                Sign Out<FaSignOutAlt />
                            </button>

                            {error ? alert("Failed to Sign out") : ""}
                        </li>
                    </ul>
                </div>
            </nav>

            <AddTask
                showAddTaskMain={false}
                shouldShowMain={shouldShowMain}
                showQuickAddTask={showQuickAddTask}
                setShowQuickAddTask={setShowQuickAddTask}
            />
        </header>
    );
};

// Header.propTypes = {
//     darkMode: PropTypes.bool.isRequired,
//     setDarkMode: PropTypes.func.isRequired,
// };