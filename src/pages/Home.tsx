import FocusAnalyze from "../components/FocusAnalyze"
import Navbar from "../components/Navbar"
import Paragraph from "../components/ContentContainer"

const Home = () => {
    return (
        <div className="bg-gray-200">
            <Navbar />
            <div className="w-full flex py-5">
            <Paragraph />
            <FocusAnalyze />
            </div>
        </div>
    )
}

export default Home
