import React, { useState } from 'react'
import { Content } from "./Content";
import { Header } from "./Header";
import { ProjectsProvider, SelectedProjectProvider } from '../../context';

function Dashboard({ darkModeDefault = false }) {
    const [darkMode, setDarkMode] = useState(darkModeDefault);
    return (
        <SelectedProjectProvider>
            <ProjectsProvider>
                <main
                    data-testid="application"
                    className={darkMode ? 'darkmode' : undefined}
                >
                    <Header darkMode={darkMode} setDarkMode={setDarkMode} />
                    <Content />
                </main>
            </ProjectsProvider>
        </SelectedProjectProvider>
    )
}

export default Dashboard