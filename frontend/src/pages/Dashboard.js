// src/pages/Dashboard.js
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />
        <main className="p-6">
          <p className="text-gray-600">Here we will render compliance stats and controls.</p>
        </main>
      </div>
    </div>
  )
}

export default Dashboard;

