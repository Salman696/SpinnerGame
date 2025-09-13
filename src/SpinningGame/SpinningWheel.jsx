import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import backbtn from "../../backgroundImages/backbtn.png";
import start from "../../backgroundImages/start.png";
import spin from "../../backgroundImages/spin.png";
import wheelbg from "../../backgroundImages/frame.png";
import asset7 from "../../backgroundImages/spinner.png";
import asset6 from "../../backgroundImages/Asset 6.png";
import arrow from "../../backgroundImages/arrow.png"
// All necessary CSS is now included via this Style component.
const Style = () => (
    <style>{`
        .game-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%; /* Take full width of its parent (which is 100vw now) */
            max-width: 900px; /* Optional: Limit max width on very large screens */
            margin: auto; /* Center the game-container itself if max-width is set */
            padding: 1rem;
            box-sizing: border-box;
        }
        .wheel-wrapper {
          position: relative;
          width: 80vw; /* Responsive width based on viewport width */
          max-width: 350px; /* Max size for the wheel */
          height: 80vw; /* Keep it square */
          max-height: 350px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
          margin-left: auto;
          margin-right: auto;
        }
        .arrow {
          width: 110px;                 
          height: 60px;
          background-image: url(${arrow});  
          background-size: contain;    
          background-repeat: no-repeat;
          background-position: center;
          position: absolute;
          top: -15px; /* Position arrow above the wheel */
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
        }
       
        .question-box {
          margin-top: 2.5rem; /* Increased margin */
          padding: 1.5rem;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          color: white;
          width: 90%; /* Responsive width for the box */
          max-width: 500px; /* Max width for readability */
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          /* Correct centering for a block element */
          margin-left: auto;
          margin-right: auto;
        }

        .question-box h2 {
          font-size: 1.7rem; /* Larger font for heading */
          font-weight: bold;
          margin-bottom: 0.7rem;
          color: #f59e0b; /* amber-500 */
        }
        .question-box p {
          font-size: 1.3rem; /* Slightly larger paragraph font */
          font-family: cursive;
          margin-bottom: 1.2rem;
          color: white;
          line-height: 1.5; /* Improved readability */
        }
       
        .done-msg {
          margin-top: 2.5rem;
          font-size: 1.4rem;
          font-weight: bold;
          color: white;
          text-align: center;
          width: 100%;
          padding: 0 1rem; /* Add padding to prevent text touching edges on small screens */
          box-sizing: border-box;
        }
        .feedback-message {
            margin-top: 1.5rem;
            font-size: 1.2rem;
            color: #f87171; /* red-400 */
            font-weight: bold;
            text-align: center;
            padding: 0 1rem;
            box-sizing: border-box;
        }
        /* Adjustments for SVG text */
        .wheel-svg text {
          font-size: 12px; /* Base font size */
        }

        /* Media queries for responsiveness */
        @media (min-width: 640px) { /* Tablets and larger */
            .wheel-wrapper {
                width: 350px; /* Fixed width for wheel on larger screens */
                height: 350px;
            }
            .question-box {
                width: 80%; /* Wider on tablets */
            }
            .wheel-svg text {
                font-size: 14px; /* Larger font on tablets */
            }
        }

        @media (min-width: 1024px) { /* Desktops */
            .spin-btn {
                font-size: 1.5rem;
                padding: 1rem 3rem;
            }
            .question-box {
                max-width: 600px; /* Max width on desktops */
                padding: 2rem;
            }
            .question-box h2 {
                font-size: 2rem;
            }
            .question-box p {
                font-family: cursive;
                font-size: 1.8rem;
            }
            .wheel-svg text {
                font-size: 14px; /* Even larger font on desktops */
            }
        }
        @media (min-width: 1600px) { /* Large LED screens */
           .game-container {
            max-width: 1200px; /* Wider container */
        }
            .wheel-wrapper {
               width: 500px;
               height: 500px;
        }
            .question-box {
                max-width: 800px;
                padding: 2.5rem;
        }
            .question-box h2 {
                font-size: 2.4rem;
        }
            .question-box p {
                font-size: 2rem;
        }
            .wheel-svg text {
                font-size: 16px;
        }
}

    `}</style>
);

const FirstScreenStyle = () => (
    <style>{`
                .game-container {
                    display: flex;
                    flex-direction: column; /* Default to column on smaller screens */
                    align-items: center;
                    justify-content: center;
                    
                    min-height: 30vh; /* Take full viewport height */
                    box-sizing: border-box;
                    gap: 1vw; /* Gap between sections */
                }

                .images-section {
                    display: flex;
                    flex-direction: column; /* Default to column on smaller screens */
                    align-items: center;
                    gap: 4vw; /* Responsive gap */
                    width: 100%; /* Take full width */
                }

                .image-asset {
                    background-size: contain; /* Use 'contain' to ensure image scales within its box */
                    background-repeat: no-repeat;
                    background-position: center;
                    width: 80vw; /* Start with a large width for smaller screens */
                    max-width: 480px; /* Max width to prevent them from becoming too big */
                    height: auto; /* Allow height to adjust proportionally */
                }

                .asset-7 {
                    background-image: url(${asset7});
                    padding-bottom: 80vw; /* Aspect ratio trick: 420/420 = 1, so 80vw height is 80vw padding-bottom */
                    max-width: 300px;
                    max-height: 300px;
                }

                .asset-6 {
                    background-image: url(${asset6});
                    padding-bottom: calc(220 / 480 * 80vw); /* Aspect ratio trick: (height / width) * current_width */
                    max-width: 480px;
                    max-height: 220px;
                }

                .button-section {
                    display: flex;
                    justify-content: center; /* Center button by default */
                    width: 100%;
                }

                .start-button {
                    height: 10vw; /* Responsive height */
                    width: 22vw; /* Responsive width */
                    max-height: 80px; /* Max height to prevent it from becoming too big */
                    max-width: 176px; /* Max width to prevent it from becoming too big */
                    border: none;
                    border-radius: 16px;
                    background-image: url(${start});
                    background-size: cover;
                    background-position: center;
                    cursor: pointer;
                    background-color: transparent;
                    transition: transform 0.2s; /* Smooth transition for hover/active states */
                }

                .start-button:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                @media (min-width: 768px) {
                    .game-container {
                       
                        padding: 0 5vw; /* Adjust padding for larger screens */
                    }

                    .images-section {
                        flex-direction: row; /* Arrange images in a row */
                        gap: 3vw; /* Adjust gap */
                        width: auto; /* Let content dictate width */
                    }

                    .image-asset {
                        width: 30vw; /* Adjust image width for larger screens */
                        height: auto;
                        /* Reset padding-bottom to allow for direct height/width if desired, or keep for aspect ratio */
                        padding-bottom: 0;
                    }

                    .asset-7 {
                        width: 25vw; /* Adjust as needed */
                        height: 25vw; /* Maintain aspect ratio */
                        max-width: 300px;
                        max-height: 300px;
                    }

                    .asset-6 {
                        width: 30vw; /* Adjust as needed */
                        height: calc(220 / 480 * 30vw); /* Maintain aspect ratio */
                        max-width: 480px;
                        max-height: 220px;
                    }

                    .button-section {
                        justify-content: flex-end; /* Align button to the end on larger screens */
                        width: auto;
                    }

                    .start-button {
                        height: 80px; /* Fixed height for larger screens */
                        width: 176px; /* Fixed width for larger screens */
                    }
                }

                @media (min-width: 1024px) {
                    .game-container {
                        padding: 0 100px; /* Revert to fixed padding on very large screens if preferred */
                    }

                    .images-section {
                        gap: 0px; /* Revert to fixed gap */
                    }

                    .asset-7 {
                        width: 300px;
                        height: 300px;
                    }

                    .asset-6 {
                        width: 480px;
                        height: 220px;
                    }
                }
                @media (min-width: 1600px) { /* Large LED screens */
                    .game-container {
                        padding: 0 200px;
                    }
                    .images-section {
                        gap: 2vw;
                    }
                    .asset-7 {
                        width: 300px;
                        height: 300px;
                    }
                    .asset-6 {
                        width: 800px;
                        height: 280px;
                    }
                    .start-button {
                        width: 220px;
                        height: 100px;
                    }
}           
             `}</style>);

const wheelOptions = [
    "Surprise!",
    "The Big Reveal!",
    "Mystery Pick!",
    "On the Spot!",
    "Challenge Zone!",
    "Hot Seat!",
    "Lucky Draw!",
    "Game On!",
    "Question Unlocked!",
];

const colors = [
    "#E971A3", // Pink
    "#7EBC42", // Green
    "#AA3574", // Purple
    "#179bd7", // Blue
    "#7EBC42", // Green
    "#AA3574", // Purple
    "#7EBC42", // Green
    "#E971A3", // Pink
    "#179bd7", // Blue
];

const questions = {
    "Surprise!":
        "You are visiting Dr. Badi at PSMMC. He wants more explanation on efficacy vs IIV for mismatched strains.",
    "The Big Reveal!":
        "You are visiting Dr. Rabieh at Dr. Suliman Al Habib Hospital. He wants to prioritize IIV for asthmatic patients.",
    "Mystery Pick!":
        "You are visiting Dr. Jennifer at Al Salamah Hospital. She worries FluMist may be less effective in children on inhaled corticosteroids.",
    "On the Spot!":
        "You are visiting Dr. Rami at Prime Hospital. He doesn’t prescribe FluMist because insurance doesn’t cover it and it costs more.",
    "Challenge Zone!":
        "You are visiting Dr. Mai at Kings Hospital. She doubts FluMist effectiveness vs injectables and concerns about administration.",
    "Hot Seat!":
        "You are visiting Dr. Mervat at MyClinic. She doubts FluMist safety for patients with medical conditions and prioritizes IIV.",
    "Lucky Draw!": "Free discussion round!",
    "Game On!": "Quick fire round with peers!",
    "Question Unlocked!": "Open question for the group!",
};

const SpinWheel = () => {
    const [disabled, setDisabled] = useState([]);
    const [current, setCurrent] = useState(null);
    const [spinning, setSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [feedback, setFeedback] = useState(""); // For user feedback
    const [gameStart, setGameStart] = useState(false);
    // Function to get the currently pointed option based on rotation
    const getPointedOption = (currentRotation) => {
        const totalRotation = currentRotation % 360; // Normalize to 0-360
        // Adjust for the initial rotation of the wheel (arrow at top, sectors start from -90 deg)
        // If arrow is at top (0 degrees), it points to the sector that is at 90 degrees counter-clockwise from 0 (or 270 degrees clockwise)
        const adjustedRotation = (360 - totalRotation + 90) % 360; // +90 to align arrow top with 0 deg of first segment

        const segmentAngle = 360 / wheelOptions.length;
        const index = Math.floor(adjustedRotation / segmentAngle);

        // Ensure index is within bounds, especially for edge cases near 360/0
        return wheelOptions[index % wheelOptions.length];
    };

    const handleSpin = () => {
        if (spinning || disabled.length === wheelOptions.length) return;
        setSpinning(true);
        setFeedback(""); // Clear previous feedback

        const available = wheelOptions.filter((opt) => !disabled.includes(opt));

        if (available.length === 0) {
            setFeedback("All questions have been played!");
            setSpinning(false);
            return;
        }

        const choice = available[Math.floor(Math.random() * available.length)];
        const segmentAngle = 360 / wheelOptions.length;
        const targetIndex = wheelOptions.indexOf(choice);

        const rotations = 5; // Spin 5 full times
        const finalAngle = 360 - (targetIndex * segmentAngle + segmentAngle / 2);

        // Ensure the rotation always increases to animate forward
        const newRotation = rotation + rotations * 360 + finalAngle - (rotation % 360);

        setRotation(newRotation);

        setTimeout(() => {
            setCurrent(choice);
            setDisabled((prev) => [...prev, choice]);
            setSpinning(false);

            if (disabled.includes(choice)) {
                setFeedback(`You landed on "${choice}" which was already played. Please spin again!`);
            }
        }, 5000); // Match this duration with the motion transition duration
    };

    const handleBack = () => setCurrent(null);

    const handleStart = () => {
        setGameStart(true)
    }
    // Use useEffect to log the current pointed option after rotation stops
    useEffect(() => {
        if (!spinning && rotation !== 0) {
            const pointedOption = getPointedOption(rotation);

        }
    }, [spinning, rotation, current]);


    return (
        <>
            {
                !gameStart &&
                <div className="game-container">
                    {/* <Style /> */} {/* If Style is a component for global styles, ensure it's placed appropriately */}
                    <FirstScreenStyle />
                    <div className="images-section">
                        <div className="image-asset asset-7" />
                        <div className="image-asset asset-6" />
                    </div>
                    <div className="button-section">
                        <button
                            onClick={handleStart}
                            className="start-button"
                        />
                    </div>
                </div>
            }
            {
                gameStart &&
                <div
                    className="game-container"
                >
                    <Style />
                    {
                        current == null &&
                        <>
                            <div className="wheel-wrapper">
                                <div className="arrow"></div>
                                <div
                                    style={{
                                        backgroundImage: `url(${wheelbg})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat",
                                        borderRadius: "50%",
                                        padding: "22px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <motion.svg
                                        width="350"
                                        height="350"
                                        viewBox="0 0 350 350"
                                        animate={{ rotate: rotation }}
                                        transition={{ duration: 5, ease: "easeOut" }}
                                        className="wheel-svg"
                                    >
                                        <g transform="translate(176,176)" >
                                            {wheelOptions.map((label, i) => {
                                                const angle = (2 * Math.PI) / wheelOptions.length;
                                                // Start angle is adjusted by -Math.PI / 2 so the first segment
                                                // starts from the top (12 o'clock position).
                                                const startAngle = i * angle - Math.PI / 2;
                                                const endAngle = startAngle + angle;
                                                const largeArc = angle > Math.PI ? 1 : 0;
                                                const radius = 170;

                                                // Segment wedge path
                                                const x1 = radius * Math.cos(startAngle);
                                                const y1 = radius * Math.sin(startAngle);
                                                const x2 = radius * Math.cos(endAngle);
                                                const y2 = radius * Math.sin(endAngle);

                                                // --- Text Logic for Wrapping ---
                                                const midAngle = startAngle + angle / 2;
                                                // Text rotation needs to be relative to the segment, and then adjusted
                                                // to be upright relative to the SVG's top.
                                                const textRotation = midAngle * (180 / Math.PI) + 90; // Add 90 to make text upright
                                                const textRadius = 110; // Radius for text position, moved inwards for space
                                                const textX = textRadius * Math.cos(midAngle);
                                                const textY = textRadius * Math.sin(midAngle);

                                                const words = label.split(' ');
                                                const lineHeight = 14;
                                                // Calculate initial dy to vertically center the whole text block
                                                const initialDy = -((words.length - 1) * lineHeight) / 2;
                                                console.log(disabled, "  disabled ones");

                                                return (
                                                    <g key={i}>
                                                        <path
                                                            d={`M0,0 L${x1},${y1} A${radius},${radius} 0 ${largeArc},1 ${x2},${y2} Z`}
                                                            fill={disabled.includes(label) ? "#1d1c1cd8" : colors[i]}
                                                            opacity={disabled.includes(label) ? 1 : 1}
                                                            stroke="#b71e6f"
                                                            strokeWidth="3"
                                                        />
                                                        <text
                                                            transform={`translate(${textX}, ${textY}) rotate(${textRotation})`}
                                                            textAnchor="middle"
                                                            dominantBaseline="middle"
                                                            fill={disabled.includes(label) ? "#6160602f" : "white"}
                                                            fontSize="12px"
                                                            fontWeight="bold"
                                                        >
                                                            {words.map((word, index) => (
                                                                // Create a new line for each word
                                                                <tspan key={index} x="0" dy={index === 0 ? initialDy : lineHeight}>
                                                                    {word}
                                                                </tspan>
                                                            ))}
                                                        </text>
                                                    </g>
                                                );
                                            })}
                                        </g>
                                        {/* Center circle */}
                                        <circle cx="175" cy="175" r="20" fill="#fcfdffff" stroke="yellow" strokeWidth="3" />
                                    </motion.svg>
                                </div>
                            </div>

                            <button
                                onClick={handleSpin}
                                disabled={spinning || disabled.length === wheelOptions.length}
                                style={{
                                    height: "80px",
                                    width: "176px",
                                    border: "none",
                                    borderRadius: "16px",
                                    backgroundImage: `url(${spin})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    cursor: "pointer",
                                    backgroundColor: "transparent"
                                }}
                            />


                        </>
                    }
                    {feedback && <p className="feedback-message">{feedback}</p>}

                    {current && (
                        <div className="question-box">
                            <h2>{current}</h2>
                            <p>{questions[current]}</p>
                            <button onClick={handleBack}
                                style={{
                                    width: 100,
                                    height: 100,
                                    border: "none",
                                    borderRadius: "50%",
                                    backgroundImage: `url(${backbtn})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    cursor: "pointer",
                                }}
                            />

                        </div>
                    )}

                    {disabled.length === wheelOptions.length && !current && (
                        <p className="done-msg">🎉 All questions have been played!</p>
                    )}
                </div>
            }
        </>
    );
};

export default SpinWheel;