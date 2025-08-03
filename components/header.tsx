const Header = () => {
  return (
    <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-serif text-lg">
                S
              </span>
            </div>
            <h1 className="text-2xl font-serif text-foreground">
              Storytellers
            </h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-foreground/80 hover:text-foreground transition-colors font-medium"
            >
              Home
            </a>
            <a
              href="#"
              className="text-foreground/80 hover:text-foreground transition-colors font-medium"
            >
              Stories
            </a>
            <a
              href="#"
              className="text-foreground/80 hover:text-foreground transition-colors font-medium"
            >
              History
            </a>
            <a
              href="#"
              className="text-foreground/80 hover:text-foreground transition-colors font-medium"
            >
              About
            </a>
          </nav>
          <button className="md:hidden">
            <svg
              className="w-6 h-6 text-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
