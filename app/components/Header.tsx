export default function Header() {
    return (
      <header className="text-center py-6 sm:py-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl mb-2 tracking-tight">
          GRAVITY DROP SIMULATOR
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-60 mx-auto"></div>
      </header>
    );
  }