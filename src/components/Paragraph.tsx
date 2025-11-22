import { useState } from "react"

const data = [
    {
        "id": 1,
        "subject": "Computer Science",
        "text": "Artificial intelligence (AI) is a branch of computer science focused on building machines that can perform tasks that typically require human intelligence. This includes understanding natural language, recognizing images, making decisions, and solving problems. AI technologies power applications such as virtual assistants, recommendation systems, autonomous vehicles, and predictive analytics. The field of AI continues to grow rapidly, with new algorithms and models emerging to improve accuracy, efficiency, and versatility."
    },
    {
        "id": 2,
        "subject": "Mathematics",
        "text": "Calculus is a branch of mathematics that deals with continuous change and is fundamental to many areas of science and engineering. Differential calculus studies how quantities change and how to calculate slopes of curves, while integral calculus focuses on accumulation of quantities and calculating areas under curves. Mastering calculus allows students to solve complex problems in physics, economics, and computer science, and it provides the foundation for advanced mathematical analysis."
    },
    {
        "id": 3,
        "subject": "History",
        "text": "The Industrial Revolution was a period of major social, economic, and technological change that began in the 18th century and continued into the 19th century. It started in Britain and spread to other parts of the world, transforming agriculture, manufacturing, transportation, and communication. The revolution led to the rise of factories, urbanization, and new labor systems. It also influenced social structures, education, and political reforms, laying the foundation for the modern industrialized world."
    },
    {
        "id": 4,
        "subject": "Science",
        "text": "Photosynthesis is a biochemical process by which green plants, algae, and some bacteria convert sunlight into chemical energy stored in glucose molecules. During photosynthesis, carbon dioxide and water are transformed into sugars and oxygen using light energy absorbed by chlorophyll. This process is essential for life on Earth, as it provides oxygen for respiration and forms the base of the food chain. Understanding photosynthesis is critical for fields like agriculture, environmental science, and renewable energy research."
    },
    {
        "id": 5,
        "subject": "English",
        "text": "Reading comprehension is the ability to read text, understand its meaning, and integrate it with existing knowledge. Strong comprehension skills enable learners to critically analyze information, identify key points, and draw inferences. Developing reading skills requires practice, focus, and strategies such as summarizing content, asking questions, and making connections. Effective reading comprehension is essential for success in academics, professional life, and lifelong learning."
    },
    {
        "id": 6,
        "subject": "Philosophy",
        "text": "Ethics is the branch of philosophy that explores questions of morality, including what is right and wrong, and how humans should act. Philosophers have debated these concepts for centuries, considering perspectives from utilitarianism, deontology, virtue ethics, and more. Understanding ethics helps individuals navigate complex moral decisions in personal life, business, law, and technology. In the modern world, ethics also plays a crucial role in AI development, bioengineering, and environmental responsibility."
    },
    {
        "id": 7,
        "subject": "Economics",
        "text": "Economics is the social science that studies how individuals, businesses, and governments allocate scarce resources to satisfy unlimited wants. Microeconomics focuses on the behavior of individuals and firms, analyzing supply, demand, and pricing mechanisms. Macroeconomics examines larger-scale economic factors such as inflation, unemployment, and national income. Understanding economics allows policymakers to make informed decisions, helps businesses plan strategically, and equips individuals to manage personal finances effectively."
    }
]
const Paragraph = () => {
    const [subjectId, setSubjectId] = useState<number | null>(null);

    return (
        <div className=" p-5 w-[50%]">
            <div className="flex gap-3 p-2 border border-gray-200 shadow-sm rounded-xl h-15">
                {data.map((item) => (
                    <button
                        key={item.id}
                        className={`px-3 py-1 rounded-xl transition-all duration-300 ${subjectId === item.id ? 'bg-blue-300 text-gray-950 font-medium' : 'bg-gray-300 font-medium text-gray-700'}`}
                        onClick={() => setSubjectId(item.id)}
                    >
                        {item.subject}
                    </button>
                ))}
            </div>

            <div className=" p-2 flex flex-col gap-5">
                {
                    subjectId ?
                        data.filter(item => item.id === subjectId).map((item) => (

                            <div key={item.id} className=" p-5 border border-gray-200 shadow-sm rounded-xl">
                                <h1 className="text-xl  font-medium">{item.subject}</h1>
                                <p className="font-medium text-gray-700">{item.text}</p>
                            </div>
                        )) :
                        <p>select a subject</p>
                }
            </div>

        </div>
    )
}

export default Paragraph
