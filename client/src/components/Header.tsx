import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { ChartLine } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  // Handle scroll behavior for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when clicking on a link
  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full transition-all duration-300 z-50 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold flex items-center space-x-2">
            <ChartLine className={`h-6 w-6 ${isScrolled ? 'text-primary' : 'text-white'}`} />
            <span className={`${isScrolled ? 'text-dark' : 'text-white'}`}>Trading Zen</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/#inicio" 
              className={`hover:text-accent transition duration-300 ${isScrolled ? 'text-dark' : 'text-white'}`}
              onClick={handleNavLinkClick}
            >
              Inicio
            </Link>
            <Link 
              href="/#ventajas" 
              className={`hover:text-accent transition duration-300 ${isScrolled ? 'text-dark' : 'text-white'}`}
              onClick={handleNavLinkClick}
            >
              Ventajas
            </Link>
            <Link 
              href="/#testimonios" 
              className={`hover:text-accent transition duration-300 ${isScrolled ? 'text-dark' : 'text-white'}`}
              onClick={handleNavLinkClick}
            >
              Testimonios
            </Link>
            <Link 
              href="/courses" 
              className={`hover:text-accent transition duration-300 ${isScrolled ? 'text-dark' : 'text-white'}`}
              onClick={handleNavLinkClick}
            >
              Cursos
            </Link>
          </nav>
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden focus:outline-none"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-6 w-6 ${isScrolled ? 'text-dark' : 'text-white'}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* CTA Button */}
          <Button 
            asChild 
            className="hidden md:block bg-accent hover:bg-amber-600 text-white py-2 px-6 rounded-full transition duration-300 font-medium"
          >
            <Link href="/#registro-form">Comenzar Ahora</Link>
          </Button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4 absolute left-4 right-4 z-50">
            <nav className="flex flex-col space-y-3">
              <Link 
                href="/#inicio" 
                className="text-dark hover:text-primary transition duration-300"
                onClick={handleNavLinkClick}
              >
                Inicio
              </Link>
              <Link 
                href="/#ventajas" 
                className="text-dark hover:text-primary transition duration-300"
                onClick={handleNavLinkClick}
              >
                Ventajas
              </Link>
              <Link 
                href="/#testimonios" 
                className="text-dark hover:text-primary transition duration-300"
                onClick={handleNavLinkClick}
              >
                Testimonios
              </Link>
              <Link 
                href="/courses" 
                className="text-dark hover:text-primary transition duration-300"
                onClick={handleNavLinkClick}
              >
                Cursos
              </Link>
              <Button 
                asChild 
                className="bg-accent hover:bg-amber-600 text-white py-2 px-6 rounded-full transition duration-300 font-medium text-center"
              >
                <Link 
                  href="/#registro-form" 
                  onClick={handleNavLinkClick}
                >
                  Comenzar Ahora
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
