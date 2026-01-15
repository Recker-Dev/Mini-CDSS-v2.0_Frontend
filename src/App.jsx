function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md h-14 flex items-center justify-between px-6">
      {/* Logo */}
      <p className="text-secondary-gray font-bold font-monospace text-lg select-all">Movie App</p>
    </nav>
  );
}

function App() {
  return <Navbar />;
}

export default App;
