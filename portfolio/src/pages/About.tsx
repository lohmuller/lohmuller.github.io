import TerminalGUI from '../terminal/TerminalGUI';
import Terminal from '../terminal/Terminal';

import { useState } from 'react'
//import Terminal from "./Components/terminal/Terminal";
//import TerminalOutlinedIcon from "@mui/icons-material/TerminalOutlined";

function About() {
    const [isOpened, setIsOpened] = useState<boolean>(true);

    function animateTerminal() {
        const terminalContainer = document.getElementById('terminal');
        if (terminalContainer) {
            if (isOpened) {
                terminalContainer.classList.add('scale-out');
                setTimeout(() => {
                    terminalContainer.style.display = 'none';
                }, 600);
                terminalContainer.classList.remove('scale-in');
            } else {
                terminalContainer.classList.add('scale-in');
                terminalContainer.style.display = 'block';
                terminalContainer.classList.remove('scale-out');
            }
        }
    }

    const rebootTerminal = () => {
        const terminalContainer = document.getElementById('terminal');
        if (terminalContainer) {
            terminalContainer.classList.add('scale-out');
            terminalContainer.style.display = 'none';
            setIsOpened(false);
            setTimeout(() => {
                terminalContainer.style.display = 'block';
                terminalContainer.classList.add('scale-in');
                terminalContainer.classList.remove('scale-out');
                setIsOpened(true);
            }, 1000);
        }
    }

    const handleOpen = () => {
        animateTerminal();
        setIsOpened(!isOpened);
    }
    const handleClose = () => {
        animateTerminal();
        setIsOpened(false);
    }

    return (
        <>
            <TerminalGUI
            //    handleClose={handleClose}
            //    rebootTerminal={rebootTerminal}
            />
        </>
    )
}

export default About;