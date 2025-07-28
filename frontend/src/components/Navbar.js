import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <header className="w-full h-16 bg-white border-b flex items-center justify-between px-6 ml-64">
      <h1 className="text-lg font-semibold text-gray-800">Compliance Dashboard</h1>
      <div className="flex items-center space-x-4">
        <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm">Export Report</button>
        <button className="text-gray-600 hover:text-black text-sm">Refresh</button>
        <div className="text-sm text-gray-800 font-medium">
          <span>Ghada Khalid</span> <span className="text-gray-500">| Cybersecurity Manager</span>
        </div>
      </div>
    </header>
  )
}

export default Navbar

