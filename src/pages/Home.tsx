import FocusAnalyze from "../components/FocusAnalyze"
import Navbar from "../components/Navbar"
import Paragraph from "../components/paragraph"

const Home = () => {
    return (
        <div className="">
            <Navbar />
            <div className="w-full flex">
            <Paragraph />
            <FocusAnalyze />
            </div>
        </div>
    )
}

export default Home
