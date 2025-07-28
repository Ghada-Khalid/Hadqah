// src/components/Sidebar.js
const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-white border-r shadow-sm fixed">
      <div className="p-6 font-bold text-xl">🛡️ Hadqah</div>
      <nav className="flex flex-col space-y-2 p-4 text-gray-700">
        <a href="#" className="hover:text-green-600 font-medium">Dashboard</a>
        <a href="#" className="hover:text-green-600">ECC Controls</a>
        <a href="#" className="hover:text-green-600">Assessment</a>
        <a href="#" className="hover:text-green-600">Gap Analysis</a>
        <a href="#" className="hover:text-green-600">Progress History</a>
        <a href="#" className="hover:text-green-600">Reports</a>
        <hr className="my-2" />
        <a href="#" className="hover:text-green-600 text-sm">About ECC-2:2024</a>
        <a href="#" className="hover:text-green-600 text-sm">How to Use</a>
        <a href="#" className="hover:text-green-600 text-sm">FAQs</a>
      </nav>
    </aside>
  )
}

export default Sidebar;

