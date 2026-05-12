import React from 'react'

const Header = () => {
  return (
     <header className="bg-white border-b px-6 py-4 flex items-center justify-between">

      {/* Left side */}
      <div>
        <h2 className="text-2xl font-bold">
          Dashboard
        </h2>

        <p className="text-gray-500 text-sm">
          Welcome back 👋
        </p>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">

        {/* Profile Avatar */}
        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold">
          E
        </div>

      </div>

    </header>
  )
}

export default Header