import { Navbardata } from "../data/Navbar.data"

const Navbar = () => {
  return (
    <nav className="h-15 border-b border-gray-300 flex items-center justify-between px-5 bg-blue-50">
      <div className="flex justify-between w-[40%]">
        <div>
          <h1 className="text-2xl font-bold flex">Atten <p className="text-red-700">Za</p></h1>
        </div>
        <div className="flex gap-8 items-center">
          {Navbardata.map((navItems) => (
            <p key={navItems.id} className="text-lg font-medium cursor-pointer">{navItems.label}</p>
          ))}
        </div>
      </div>
      <div>
        <button className="px-4 py-2 rounded-xl border border-blue-300 shadow-sm font-medium bg-blue-400 hover:scale-[1.03] transition-all duration-500 cursor-pointer">Get Started</button>
      </div>
    </nav>
  )
}

export default Navbar
