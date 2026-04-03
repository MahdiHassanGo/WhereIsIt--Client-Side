const Loading = () => {
    return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-transparent border-t-[#8B5CF6] border-r-[#06B6D4] animate-spin"></div>
              <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-[#8B5CF6] border-l-[#06B6D4] animate-spin animate-reverse" style={{animationDirection: 'reverse', animationDuration: '0.6s'}}></div>
            </div>
            <p className="text-slate-400 text-sm font-medium tracking-widest uppercase animate-pulse">Loading...</p>
          </div>
        </div>
    );
};

export default Loading;