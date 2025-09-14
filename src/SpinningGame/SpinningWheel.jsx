import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import backbtn from "../../backgroundImages/backbtn.png";
import start from "../../backgroundImages/start.png";
import spin from "../../backgroundImages/spin.png";
import wheelbg from "../../backgroundImages/frame.png";
import asset7 from "../../backgroundImages/spinner.png";
import asset6 from "../../backgroundImages/Asset 6.png";
import arrow from "../../backgroundImages/arrow.png";
import medrep from "../../backgroundImages/medrep.png";
import answer1 from "../../backgroundImages/answer1.pdf";
import answer2 from "../../backgroundImages/answer2.pdf";
import answer3 from "../../backgroundImages/answer3.pdf";
import answer4 from "../../backgroundImages/answer4.pdf";
import answer5 from "../../backgroundImages/answer5.pdf";
import answer6 from "../../backgroundImages/answer6.pdf";
import answer7 from "../../backgroundImages/answer7.pdf";
import answer8 from "../../backgroundImages/answer8.pdf";
import answer9 from "../../backgroundImages/answer9.pdf";
// audio file
import bgAudio from "../../backgroundAudio/bgAudio.mp3";
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
       
         /* ---------- question box (layout with medrep image) ---------- */
    .question-box {
      margin-top: 1.5rem;
      padding: 1rem;
      background-color: rgba(255,255,255,0.08);
      border-radius: 12px;
      color: white;
      width: 94%;
      max-width: 800px;
      text-align: left;
      border: 1px solid rgba(255,255,255,0.12);
      backdrop-filter: blur(6px);
      box-sizing: border-box;
      display: flex;
      gap: 1rem;
      align-items: flex-start;
    }

    .question-media {
      flex: 0 0 90px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .medrep-img {
      width: 78px;
      height: 72px;
      border-radius: 12px;
      object-fit: cover;
    
    }

    .question-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }

    .question-content h2 {
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0;
      color: #f59e0b;
    }

    .question-text {
      font-size: 1.3rem;
      line-height: 1.4;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      color: #fff;
      max-height: 220px; /* limits height for very long content */
      overflow: auto;
      padding-right: 8px; /* breathing room for scrollbar */
    }

    .question-actions {
      display: flex;
      gap: 12px;
      align-items: center;
      margin-top: 8px;
    }

    /* ---------- timer ---------- */
    .timer {
      display: flex;
      align-items: center;
      gap: 12px;
      color: #fff;
      font-weight: 600;
      margin-left: auto;
    }
   
   

    /* ---------- done/feedback messages ---------- */
    .feedback-message, .done-msg {
      margin-top: 1rem;
      color: #ff9b9b;
      font-weight: 700;
      text-align: center;
    }

    /* ---------- lightweight responsive modal for PDF ---------- */
    .pdf-modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      padding: 20px;
    }
    .pdf-modal {
      width: min(1200px, 95vw);
      height: -webkit-fill-available;

      background: #fff;
      border-radius: 12px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 20px 60px rgba(0,0,0,0.45);
    }
    .pdf-modal .modal-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 8px 12px;
      background: #f7f7f7;
      border-bottom: 1px solid #e6e6e6;
    }
    .pdf-modal .modal-actions button {
      margin-left: 8px;
      padding: 6px 8px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      background: #fff;
    }
    .pdf-modal .pdf-body {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ddd;
    }
    .pdf-wrapper {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .pdf-inner {
      width: 100%;
      height: 100%;
    }
    .pdf-inner object, .pdf-inner iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
      .reveal-btn {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-weight: 700;
      box-shadow: 0 8px 18px rgba(0,0,0,0.25);
    }

    .reveal-btn:acti
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
                
                padding: 1rem;
            }
            .question-box h2 {
                font-size: 2rem;
            }
            .question-box p {
                font-family: cursive;
                font-size: 1.3rem;
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
                font-size: 1.3rem;
        }
            .wheel-svg text {
                font-size: 16px;
        }
    }
          /* ---------- responsive small screens ---------- */
    @media (max-width: 640px) {
      .question-box { flex-direction: row; align-items: center; text-align: center; }
      .question-media { flex: 0 0 auto; }
      .medrep-img { width: 72px; height: 72px; }
      .question-text { max-height: 180px; font-size: 1.0rem; }
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
        "You are visiting Dr. Zeyad Consultant Pediatrician at Mediclinic Hospital, Dr. Zayed is currently prescribing FluMist, but he recently received information that FluMist has some component of Porcine and he is thinking to move again to IIV only?",
    "The Big Reveal!":
        "You are visiting Dr. Rania Consultant Paediatrician at Mediclinic Hospital, Dr. Rania is currently supporting FluMist vaccination to children with asthma, but she wants to know more if it is safe for her patients on biological treatment ? ",
    "Mystery Pick!":
        "You are visiting Dr. Badi consultant Pediatric Infectious disease at PSMMC, He is currently willing to start flu vaccination to children with LAIV, but he had a concern regarding our efficacy data in comparison with IIV and asked for more explanation about how we could provide more reduction with the mismatched strains vs IIV?",
    "On the Spot!":
        "You are visiting Dr. Rabieh consultant Pediatricians at Dr. Suliman Al Habib Hospital, He is currently willing to start flu vaccination to healthy children with LAIV, but he has a lot of Asthmatic patients visiting his clinic and he want to prioritize IIV only for them?",
    "Challenge Zone!":
        "You are visiting Dr. Jennifer Specialist Pediatricians at Al Salamah Hospital; She is worried about giving FluMist to children who are currently on inhaled corticosteroids that may affect the efficacy of FluMist?",
    "Hot Seat!":
        "You are visiting Dr. Rami Specialist Pediatricians at Prime Hospital; He don’t like to prescribe FluMist as it’s not covered by the insurance and is more expensive than injectables?",
    "Lucky Draw!": "You are visiting Dr. Mai Consultant Pediatricians at Kings Hospital; She doesn’t believe that FluMist is as effective as injectable vaccines, and has a doubt that administration mistakes (single nostril administration/ inadvertent half dose administration) can impact the right delivery and efficacy of the vaccine?",
    "Game On!": "You are visiting Dr. Abdullah the clinical Pharmacist in Dallah Hospital, and he is asking about short shelf life of FluMist compared IIV?",
    "Question Unlocked!": "Dr. Hassanein pediatrician from Al Ain mentioned that most of my patients live in big family houses alongside their grandparents, will FluMist be transmitted to their grandparents and put them at risk?"
};

const SpinWheel = () => {
    const [disabled, setDisabled] = useState([]);
    const [current, setCurrent] = useState(null);
    const [spinning, setSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [feedback, setFeedback] = useState(""); // For user feedback
    const [gameStart, setGameStart] = useState(false);


    // Timer states
    const DEFAULT_TIME = 300; // seconds, adjust as needed
    const [secondsLeft, setSecondsLeft] = useState(DEFAULT_TIME);
    const [timerRunning, setTimerRunning] = useState(false);
    const timerRef = useRef(null);

    // PDF modal states
    const [pdfOpen, setPdfOpen] = useState(false);
    const [pdfZoom, setPdfZoom] = useState(1);
    // If you uploaded the PDF to server / static hosting, replace below path with that hosted path.
    // For demo local file (during dev), you might serve it from public folder and use "/files/answer.pdf"
    const answers = {
        "Surprise!": answer1,
        "The Big Reveal!": answer2,
        "Mystery Pick!": answer3,
        "On the Spot!": answer4,
        "Challenge Zone!": answer5,
        "Hot Seat!": answer6,
        "Lucky Draw!": answer7,
        "Game On!": answer8,
        "Question Unlocked!": answer9,
    };

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
        playSound();
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
            // start timer automatically when question appears
            setSecondsLeft(DEFAULT_TIME);
            setTimerRunning(true);
            if (disabled.includes(choice)) {
                setFeedback(`You landed on "${choice}" which was already played. Please spin again!`);
            }
        }, 5000); // Match this duration with the motion transition duration
    };


    const handleStart = () => setGameStart(true);
    const handleBack = () => {
        setCurrent(null);
        setTimerRunning(false);
        setSecondsLeft(DEFAULT_TIME);
        setPdfOpen(false);
        setPdfZoom(1);
        stopSound()
    };

    // Timer effect for countdown
    useEffect(() => {
        if (timerRunning) {
            timerRef.current = setInterval(() => {
                setSecondsLeft((s) => {
                    if (s <= 1) {
                        clearInterval(timerRef.current);
                        setTimerRunning(false);
                        setFeedback("Time's up! Discuss the answer or reveal it.");
                        return 0;
                    }
                    return s - 1;
                });
            }, 1000);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [timerRunning]);



    // simple percent for progress bar (left -> used)
    // convert seconds to mm:ss
    const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
    const seconds = String(secondsLeft % 60).padStart(2, "0");
    const timeFormatted = `${minutes}:${seconds}`;

    const percentUsed = ((DEFAULT_TIME - secondsLeft) / DEFAULT_TIME) * 100;
    // PDF modal controls
    const openPdfModal = () => {
        setPdfOpen(true);
        setPdfZoom(1);
    };
    const closePdfModal = () => setPdfOpen(false);
    const zoomIn = () => setPdfZoom((z) => Math.min(3, +(z + 0.25).toFixed(2)));
    const zoomOut = () => setPdfZoom((z) => Math.max(0.5, +(z - 0.25).toFixed(2)));

    // Use useEffect to log the current pointed option after rotation stops
    useEffect(() => {
        if (!spinning && rotation !== 0) {
            const pointedOption = getPointedOption(rotation);

        }
    }, [spinning, rotation, current]);
    const audioRef = useRef(null);

    const playSound = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    const stopSound = () => {
        if (audioRef.current) {
            audioRef.current.pause();     // pause the audio
            audioRef.current.currentTime = 0; // reset to start
        }
    };

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
                    {/* Hidden audio element */}
                    <audio ref={audioRef} src={bgAudio} />
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

                    {/* question displayed */}
                    {current && (
                        <div className="question-box" role="region" aria-label="question box">

                            <div className="question-media">
                                <img src={medrep} alt="medrep" className="medrep-img" />
                            </div>

                            <div className="question-content">
                                <div style={{ display: "flex", gap: 32, marginLeft: "auto" }}>
                                    {/* timer aligned to right */}
                                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                        <div className="timer">
                                            <div style={{ minWidth: 48, textAlign: "center" }}>{timeFormatted}</div>
                                            <div aria-hidden>
                                                <i style={{ width: `${percentUsed}%` }} />
                                            </div>
                                        </div>
                                        <button

                                            onClick={openPdfModal}
                                            title="Reveal Answer"
                                            aria-label="Reveal Answer"
                                            style={{
                                                color: "white",
                                                backgroundColor: "#ff0000e8"
                                            }}
                                        >Reveal</button>
                                    </div>
                                </div>
                                <div className="question-text">
                                    <p>{questions[current]}</p>
                                </div>

                                <div className="question-actions">
                                    <button onClick={handleBack}
                                        style={{
                                            width: 90,
                                            height: 90,
                                            border: "none",
                                            borderRadius: "50%",
                                            backgroundImage: `url(${backbtn})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            cursor: "pointer",
                                        }}
                                        aria-label="Back"
                                    />

                                    <div style={{ marginLeft: "auto" }}>
                                        {disabled.length === wheelOptions.length && !current ? (
                                            <p className="done-msg">🎉 All questions have been played!</p>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* PDF modal (lightweight) */}
                    {pdfOpen && (
                        <div className="pdf-modal-overlay" onClick={closePdfModal}>
                            <div className="pdf-modal" onClick={(e) => e.stopPropagation()}>
                                <div className="modal-top">
                                    <div style={{ fontWeight: 700 }}>Answer PDF</div>
                                    <div className="modal-actions">
                                        <button onClick={zoomOut} aria-label="Zoom out">−</button>
                                        <button onClick={zoomIn} aria-label="Zoom in">+</button>
                                        <a href={answers[current]} target="_blank" rel="noreferrer">
                                            <button aria-label="Open in new tab">Open</button>
                                        </a>
                                        <a href={answers[current]} download>
                                            <button aria-label="Download">Download</button>
                                        </a>
                                        <button onClick={closePdfModal}>Close</button>
                                    </div>
                                </div>

                                <div className="pdf-body">
                                    <div className="pdf-wrapper">
                                        <div className="pdf-inner" style={{ transform: `scale(${pdfZoom})`, transformOrigin: "top center" }}>
                                            {/* object tag displays PDF in most browsers and scales. Fallback could be iframe */}
                                            <object data={answers[current]} type="application/pdf" aria-label="Answer PDF">
                                                <iframe src={answers[current]} title="answer-pdf" />
                                            </object>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {disabled.length === wheelOptions.length && !current && (
                        <p className="done-msg">🎉 All questions have been played!</p>
                    )}
                </div >
            }
        </>
    );
};

export default SpinWheel;