import FocusAnalyze from "../components/FocusAnalyze"
import Navbar from "../components/Navbar"
import Paragraph from "../components/paragraph"

const Home = () => {
    return (
        <div className="bg-gray-100">
            <Navbar />
            <div className="w-full flex p-5">
            <Paragraph />
            <FocusAnalyze />
            </div>
        </div>
    )
}

export default Home
