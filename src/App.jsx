import './App.css'
import SpinningWheel from './SpinningGame/SpinningWheel'
import gamebg from "../backgroundImages/bg.png";

function App() {
  return (
 <div
  style={{
    backgroundImage: `url(${gamebg})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%", // 🔑 force stretch both width & height
    backgroundColor: "#179bd7", // will fill gaps left by aspect ratio
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    boxSizing: "border-box",
  }}
>
  <SpinningWheel />
</div>


  )
}

export default App