/**
 * Based on https://github.com/abderox
 */

import { AppBar, Box, IconButton, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useRef } from "react";
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import TerminalOutlinedIcon from '@mui/icons-material/TerminalOutlined';
import TypingEffect from "./TypingEffect";

import "./index.css";

import Terminal from "./Terminal";

interface TerminalGUIProps {
    title?: string;
    canResize?: boolean;
    //  canMaxMin: boolean;
    //terminal: Terminal;
    //  handleClose?: () => void;
    //  rebootTerminal?: () => void;
}


const TerminalGUI: React.FC<TerminalGUIProps> = ({
    title = 'My Terminal',
}) => {

    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [showPrompt, setShowPrompt] = React.useState<boolean>(true);
    const [inputValue, setInputValue] = React.useState<string>('');
    const [outputValue, setOutputValue] = React.useState<Array<JSX.Element>>([]);
    const [width, setWidth] = React.useState(700);
    const [height, setHeight] = React.useState(400);

    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const reff = React.useRef<HTMLDivElement>(null);
    //const [history, setHistory] = React.useState<string[]>([]);
    //const [historyIndex, setHistoryIndex] = React.useState<number>(0);
    const draggableRef = React.useRef(null);
    const innerRef = React.useRef(null);
    const inputRef = useRef(null);
    //let historyIndex = 0;

    //terminal.setOutputValue = setOutputValue;




    const generatePromptElement = (cmmd: string = "") => {
        const usernameDisplay = terminal.username ?? 'guest';
        const prompt = `>${usernameDisplay}@${terminal.currentHost}:${terminal.currentPath}$`;
        return <span><span style={{
            color: 'lime',
            fontWeight: 'bold',
            marginRight: '5px',
        }}>{prompt}</span>{cmmd}</span>;
    };

    /**
     * 
     * @param content 
     * @param newline 
     */
    const println = (content: JSX.Element | string, newline = true): void => {
        const styles: React.CSSProperties = {
            margin: '0',
            display: 'inline',
            minHeight: '1em',
            whiteSpace: 'pre-wrap',
        };

        const formattedContent =
            typeof content === "string"
                ? <pre style={styles}><TypingEffect speed={0.5}>{content}</TypingEffect></pre>
                : content;

        const formattedOutput = newline ? <>{formattedContent}<br /></> : formattedContent;

        setOutputValue(prevState => [...prevState, formattedOutput]);
    };

    const terminal = new Terminal({ username: "xablau", println: println, setOutputValue: setOutputValue });

    React.useEffect(() => {
        terminal.init();
    }, []);

    React.useEffect(() => {
        if (reff.current) {
            reff.current.scrollTop = reff.current.scrollHeight;
        }
    }, [reff]);

    React.useLayoutEffect(() => {
        if (innerRef.current) {
            draggableRef.current = innerRef.current;
        }
    }, [innerRef]);

    React.useEffect(() => {
        const handleDocumentClick = (event) => {
            // Verificar se o clique foi fora do input
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                // Definir o foco no input
                inputRef.current.focus();
            }
        };

        // Adicionar um event listener ao documento para capturar cliques
        document.addEventListener('click', handleDocumentClick);

        // Limpar o event listener quando o componente for desmontado
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []); // O array vazio assegura que o effect é executado apenas uma vez, similar ao componentDidMount




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
        /*    if (handleClose) {
                handleClose();
            }*/
    };

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
                terminal.history.push(inputValue); // = (prevHistory => [...prevHistory, inputValue]);
                terminal.historyIndex = history.length;
                println(generatePromptElement(inputValue));
                terminal.handleCommand(inputValue);
                setInputValue('');
                break;
            case 'Tab':
                event.preventDefault();
                const matchingCmd = terminal.importedCmdClasses.find(cmdClass => cmdClass.cmd.startsWith(inputValue));
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
                        ? Math.max(terminal.historyIndex - 1, 0)
                        : Math.min(terminal.historyIndex + 1, history.length - 1);
                terminal.historyIndex = newIndex;
                setInputValue(terminal.history[newIndex]);
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


            {/** Terminal title bar  */}
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

            {/** Terminal-content */}
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
                    {showPrompt && generatePromptElement()}
                    <div>
                        <input
                            spellCheck="false"
                            autoComplete='off'
                            type="text"
                            value={inputValue}
                            ref={inputRef}
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
                            className="custom-input"
                            onChange={handleInputChange}
                            onKeyDown={handleEnterKeyPress}
                            autoFocus
                        />
                    </div>
                </div>
            </Box>
            {/** Terminal-content - END */}

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

export default TerminalGUI;
