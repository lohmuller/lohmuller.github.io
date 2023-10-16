/**
 * <h2>NotUnix-Terminal</h2>
 * <p>Terminal component is a component that allows you to interact with the system</p>
 * @copyright 2023
 * <a href="https://github.com/abderox">abderox</a>
 */

import { AppBar, Box, IconButton, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import TerminalOutlinedIcon from '@mui/icons-material/TerminalOutlined';
import TypingEffect from "./TypingEffect";

import "./index.css";

//Commands
import { HelpCmd } from "./commands/HelpCmd";
import { DateCmd } from "./commands/DateCmd";
import Command, { CommandProps, TerminalInterface } from "./commands/Command";
import { LsCmd } from "./commands/LsCmd";
import { ClearCmd } from "./commands/ClearCmd";
import { WhoAmICmd } from "./commands/WhoAmICmd";

interface TerminalProps {
    title?: string;
    handleClose?: () => void;
    rebootTerminal?: () => void;
}

const Terminal: React.FC<TerminalProps> = ({
    title = 'My Terminal',
    handleClose,
    rebootTerminal,
}) => {

    const username = 'Ian';
    const currentPath = '~';
    const currentHost = title.toLowerCase().replace(' ', '');

    const getInitInput = (cmmd: string = "") => {
        const usernameDisplay = username ?? 'guest';
        const prompt = `>${usernameDisplay}@${currentHost}:${currentPath}$ `;
        return <span style={{
            color: 'lime',
            fontWeight: 'bold',
            marginRight: '5px',
        }}>{prompt}{cmmd}</span>;
    };

    const [terminal, setterminal] = React.useState<TerminalInterface>();
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [showPrompt, setShowPrompt] = React.useState<boolean>(true);
    const [inputValue, setInputValue] = React.useState<string>('');
    const [outputValue, setOutputValue] = React.useState<Array<JSX.Element>>([]);
    const [lastLogin, setLastLogin] = React.useState(new Date());
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const reff = React.useRef<HTMLDivElement>(null);
    const [history, setHistory] = React.useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = React.useState<number>(0);
    const [width, setWidth] = React.useState(600);
    const [height, setHeight] = React.useState(400);
    const draggableRef = React.useRef(null);
    const innerRef = React.useRef(null);

    /**
     * 
     * @param content 
     * @param newline 
     */
    const println = (content: JSX.Element | string, newline = true): void => {
        const styles: React.CSSProperties = {
            margin: '0',
            display: 'inline',
            whiteSpace: 'pre-wrap',
        };

        const formattedContent =
            typeof content === "string"
                ? <pre style={styles}><TypingEffect speed={20}>{content}</TypingEffect></pre>
                : content;

        const formattedOutput = newline ? <>{formattedContent}<br /></> : formattedContent;

        setOutputValue(prevState => [...prevState, formattedOutput]);
    };

    // ? add as many commands as you want
    /*const mapCommands = new Map([
        ['help', 'help - list all commands'],
        ['clear', 'clear - clear the terminal screen'],
        ['echo', 'echo - echo arguments to the standard output'],
        ['whoami', 'whoami - print effective username'],
        ['reload', 'reload - reload the terminal'],
        ['history', 'history - show the history of commands'],
        ['clear history', 'clear history - clear the history of commands'],
        ['date', 'date - print the system date and time'],
        ['pwp', 'pwd - print name of current/working page'],
        ['exit', 'exit - cause the shell to exit'],
        ['reboot', 'reboot - reboot the system'],
        ['logout', 'logout - logout from the platform'],
        ['u -r', 'user management - redirection to page'],
    ]);*/


    React.useEffect(() => {
        setOutputValue([])
        setHistory([]);
        setLastLogin(new Date());

        println("Fedora 31 <WorkStation Edition>");
        println("Kernel 5.3.13-300.fx86_64");
        println(`Last Login: ${lastLogin}`);
        println("");
        println("Welcome to Terminal ! Type \"help\" to see the list of commands.");

    }, []);

    React.useEffect(() => {
        if (reff.current) {
            reff.current.scrollTop = reff.current.scrollHeight;
        }
    }, [outputValue]);

    React.useLayoutEffect(() => {
        if (innerRef.current) {
            draggableRef.current = innerRef.current;
        }
    }, [innerRef]);



    //? handle maximize of the terminal
    const handleMaximize = () => {
        const terminalContainer = document.getElementById('terminal');
        if (terminalContainer) {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
            terminalContainer.style.top = '0';
            terminalContainer.style.left = '0';
            setPosition({ x: 0, y: 0 });

        }

    }
    //? handle minimize of the terminal
    const handleMinimize = () => {
        const terminalContainer = document.getElementById('terminal');
        if (terminalContainer) {
            setHeight(matchDownSM ? 200 : 400);
            setWidth(matchDownSM ? 350 : 600);
            terminalContainer.style.top = '30%';
            terminalContainer.style.left = '30%';
            setPosition({ x: 0, y: 0 });
        }
    }

    const handleCloseClick = () => {
        if (handleClose) {
            handleClose();
        }
    };

    /*
    * ? add as many methods as you want according to your needs
    * from here
     */

    // ? logout from the terminal
    const handleLogout = () => {
        //    setMessage(`Logging out... \n`);
        setTimeout(() => {
            // some logic like dispatching logout action
            //    setInitialCommand(`Notlunix\\github\\>guest@${title.toLowerCase().replace(' ', '')}:~$ `);
        }, 3000);
    }

    //? reboot the terminal
    const reboot = () => {
        //    setMessage(`Rebooting... \n Please be patient...`);
        if (rebootTerminal) {
            rebootTerminal();
        }
        setTimeout(() => {
            setInputValue('');
            setLastLogin(new Date());
            //     setMessage('');
        }, 3000);
    }

    const redirectToPage = (command: string) => {
        switch (command) {
            case 'u -r':
                // navigate to users page
                return 'Redirecting to users page...';
            default:
                return null;
        }
    }

    const cmds: typeof Command[] = [
        HelpCmd,
        DateCmd,
        LsCmd,
        ClearCmd,
        WhoAmICmd
    ]

    let cmdList: { [key: string]: typeof Command } = {};

    React.useEffect(() => {
        let terminal: TerminalInterface = {
            showPrompt: showPrompt,
            setShowPrompt: setShowPrompt,
            setOutputValue: setOutputValue,
            currentCmd: null,
            println: println,
            cmds: cmds,
            cmdList: cmdList,
            parameters: "",
            fullcmd: "",
            username: username ?? 'Guest',
            history: history,
            currentPath: currentPath,
            workDir: "",
        }
        setterminal(terminal);
    }, []);


    //transform in a Class


    cmds.forEach((CommandClass: typeof Command) => {
        cmdList[CommandClass.cmd] = CommandClass;
    });

    /*
    * ? handle the command entered by the user
     */
    const handleCommand = (promptInput: string) => {

        promptInput = promptInput.trim();

        if (terminal === undefined) {
            return;
        }

        if (terminal.currentCmd === null) {
            println(getInitInput(promptInput));
            let [command, parameters] = promptInput.split(' ');

            if (promptInput === '') {
                return;
            }

            if (!(command in cmdList)) {
                println(`Command not found: ${command}`);
                return;
            }
            terminal.fullcmd = promptInput;
            terminal.parameters = parameters;

            const commandClass = cmdList[command] as unknown as HelpCmd as Command as any;
            terminal.currentCmd = new commandClass(terminal);
            terminal.setShowPrompt(false);
            if (terminal.currentCmd !== null) {
                terminal.currentCmd.run();
            }
        } else {
            terminal.currentCmd.newInput(promptInput);
        }



        return;

        if (command.trim() === 'reboot') {
            reboot();
            return;
        }
        if (command.trim() === 'pwd ') {
            output += `${window.location.pathname}`;
            setOutputValue(output);
            return;
        }
        if (command.trim() === 'exit') {
            output += 'Goodbye!\n';
            setOutputValue(output);
            setTimeout(() => {
                handleCloseClick();
            }, 1500);
            return;
        }
        if (command.startsWith('echo')) {
            output += ` ${command.replace('echo', '')}\n`;
            setOutputValue(prevState => prevState + output);
            return;
        }
        if (command.toLowerCase() === 'whoami') {
            output += ` ${username ?? 'Guest'}\n`;
            setOutputValue(prevState => prevState + output);
            return;
        }

        if (command.toLowerCase().trim() === ('reload')) {
            window.location.reload();
            return;
        }
        if (command.toLowerCase().trim() === ('history')) {
            history.forEach((value, index) => {
                output += ` ${index} \t\t ${value} \n`;
            });
            setOutputValue(prevState => prevState + output);
            return;
        }
        if (command.toLowerCase().trim() === ('clear history')) {
            setHistory([]);
            output += ` History cleared\n`;
            setOutputValue(prevState => prevState + output);
            return;
        }
    }

    /*
    * these methods are used to handle the input change and the enter key press and draggability of the terminal, you can modify them according to your needs
    * or install libraries to handle them
     */

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleEnterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        switch (event.key) {
            case 'Enter':
                setHistory(prevHistory => [...prevHistory, inputValue]);
                setHistoryIndex(history.length);
                handleCommand(inputValue);
                setInputValue('');
                break;
            case 'Tab':
                event.preventDefault();
                const matchingCmd = cmds.find(cmdClass => cmdClass.cmd.startsWith(inputValue));
                if (matchingCmd) {
                    setInputValue(matchingCmd.cmd);
                }
                break;
            case 'ArrowUp':
            case 'ArrowDown':
                event.preventDefault();
                if (history.length == 0) break;
                const newIndex =
                    event.key === 'ArrowUp'
                        ? Math.max(historyIndex - 1, 0)
                        : Math.min(historyIndex + 1, history.length - 1);
                setHistoryIndex(newIndex);
                setInputValue(history[newIndex]);
                break;
            default:
                break;
        }
    };

    // ?handle resize of the terminal by stretching the corners (not working perfectly)
    const handleResize = (
        direction: "bottom" | "right" | "top" | "left",
        event: React.MouseEvent<HTMLDivElement>
    ) => {
        event.preventDefault();
        const startX = event.clientX;
        const startY = event.clientY;
        const handleMouseMove = (event: MouseEvent) => {
            const deltaX = event.clientX - startX;
            const deltaY = event.clientY - startY;

            if (direction === 'right') {
                setWidth(width + deltaX > 600 ? width + deltaX : 600);
            } else if (direction === 'bottom') {
                setHeight(height + deltaY > 400 ? height + deltaY : 400);
            } else if (direction === 'top') {
                setHeight(height - deltaY > 400 ? height - deltaY : 400);
            } else if (direction === 'left') {
                setWidth(width - deltaX > 600 ? width - deltaX : 600);
            }

        };
        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    // ?handle draggability of the terminal
    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        return;
        const initialMouseX = event.clientX;
        const initialMouseY = event.clientY;
        const handleMouseMove = (event: MouseEvent) => {
            const deltaX = event.clientX - initialMouseX;
            const deltaY = event.clientY - initialMouseY;
            const newPosition = {
                x: position.x + deltaX,
                y: position.y + deltaY,
            };
            setPosition(newPosition);
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };


    return (
        <Box id={"terminal"}
            ref={draggableRef}
            sx={{
                overflowY: 'hidden',
                width: width, height: height,
                overflowX: 'hidden',
                backgroundColor: 'rgba(0, 0, 0, 0.56)',
                backdropFilter: 'blur(7px)',
                webkitBackdropFilter: 'blur(7px)',
                position: 'absolute',
                //     display: 'none',
                zIndex: 10000000,
                borderRadius: '5px',
                boxShadow: '0px 10px 8px rgba(0, 0, 0, 0.3)',
                transform: `translate(${position.x}px, ${position.y}px)`
            }}>
            <Box sx={{
                backgroundColor: 'transparent',
                p: 0,
                m: 0,
                width: '100%',
                height: 64
            }}>
                <AppBar position="static" sx={{
                    backgroundColor: 'transparent',
                    padding: '0px',
                    cursor: 'grab',
                }}>
                    <Toolbar className="toolbar" onMouseDown={handleMouseDown}>
                        <Typography variant="body2" component="div" sx={{
                            flexGrow: 1,
                            display: 'flex', alignItems: 'start',
                            fontSize: '1.2rem',
                        }} color={"white"}>
                            <TerminalOutlinedIcon
                                sx={{ marginRight: '5px', color: 'white', fontSize: '1.5rem' }} />
                            {title}
                        </Typography>
                        <Box sx={{ display: 'flex' }}>

                            <IconButton
                                size="small"
                                aria-label="maximize"
                                onClick={handleMaximize}
                                sx={{
                                    marginRight: '5px',
                                    backgroundColor: 'rgba(0, 0, 0, 0.49)',
                                    borderRadius: '50%'
                                }}
                            >
                                <OpenInNewIcon fontSize="small" sx={{
                                    color: 'white',
                                }} />
                            </IconButton>
                            <IconButton
                                size="small"
                                aria-label="minimize"
                                sx={{
                                    marginRight: '5px',
                                    backgroundColor: 'rgba(0, 0, 0, 0.49)',
                                    borderRadius: '50%'
                                }}
                                onClick={handleMinimize}
                            >
                                <CloseFullscreenIcon fontSize="small" sx={{
                                    color: 'white',
                                }} />
                            </IconButton>

                            <IconButton
                                size="small"
                                aria-label="close"
                                color="error"
                                sx={{
                                    marginRight: '5px',
                                    backgroundColor: 'rgba(0, 0, 0, 0.49)',
                                    borderRadius: '50%'
                                }}
                                onClick={handleCloseClick}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box className="terminal-content" ref={reff}>
                <div style={{
                    margin: '0px',
                    whiteSpace: 'normal'
                }}>
                    {outputValue.map((item, index) => (
                        <React.Fragment key={index}>{item}</React.Fragment>
                    ))}
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                }}>
                    {showPrompt && getInitInput()}
                    <div>
                        <input
                            type="text"
                            value={inputValue}
                            name="terminal-input"
                            style={{
                                border: 'none',
                                outline: 'none',
                                backgroundColor: 'transparent',
                                color: 'white',
                                width: '100%',
                                caretColor: 'white',
                                fontSize: '1rem',
                                padding: '0px',
                                margin: '0px',
                                fontFamily: 'monospace',
                            }}
                            onChange={handleInputChange}
                            onKeyDown={handleEnterKeyPress}
                            autoFocus
                        />
                    </div>
                </div>
            </Box>
            <div
                style={{
                    position: 'absolute',
                    bottom: '-5px',
                    width: '100%',
                    height: '10px',
                    cursor: 'ns-resize',
                    background: 'transparent',
                }}
                onMouseDown={(e) => handleResize('bottom', e)}
            />
            <div
                style={{
                    position: 'absolute',
                    right: '-5px',
                    bottom: '-5px',
                    width: '10px',
                    height: '100%',
                    cursor: 'ew-resize',
                    background: 'transparent',
                }}
                onMouseDown={(e) => handleResize('right', e)}
            />
            <div
                style={{
                    position: 'absolute',
                    left: '5px',
                    bottom: '-5px',
                    width: '10px',
                    height: '100%',
                    cursor: 'ew-resize',
                    background: 'transparent',
                }}
                onMouseDown={(e) => handleResize('left', e)}
            />

        </Box >
    );
}

export default Terminal;
