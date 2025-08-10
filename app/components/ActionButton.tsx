interface ActionButtonProps {
    onStartFall: () => void;
    isFalling: boolean;
  }
  
  export default function ActionButton({ onStartFall, isFalling }: ActionButtonProps) {
    return (
      <button
        onClick={onStartFall}
        disabled={isFalling}
        className="group relative w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 disabled:opacity-50 text-white font-bold rounded-3xl py-6 px-8 text-xl shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 disabled:transform-none transition-all duration-300 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        <div className="relative flex items-center justify-center">
          {isFalling ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
              <span className="text-lg">DROPPING...</span>
            </>
          ) : (
            <>
              <span className="text-lg font-black tracking-wider">INITIATE DROP</span>
            </>
          )}
        </div>
      </button>
    );
  }