
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock background scroll without hiding the scrollbar
  useEffect(() => {
    const prevent = (e: Event) => {
      e.preventDefault();
    };
    const preventKeys = (e: KeyboardEvent) => {
      const keys = [
        'ArrowUp',
        'ArrowDown',
        'PageUp',
        'PageDown',
        'Home',
        'End',
        ' ', // Spacebar
      ];
      if (keys.includes(e.key)) e.preventDefault();
    };

    if (isMobileMenuOpen) {
      document.addEventListener('wheel', prevent, { passive: false });
      document.addEventListener('touchmove', prevent, { passive: false });
      document.addEventListener('keydown', preventKeys);
    }

    return () => {
      document.removeEventListener('wheel', prevent as EventListener);
      document.removeEventListener('touchmove', prevent as EventListener);
      document.removeEventListener('keydown', preventKeys as EventListener);
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Empty div to maintain layout balance */}
          <div></div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('skills')}
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              Skills
            </button>
            <button 
              onClick={() => scrollToSection('experience')}
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              Experience
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
            className={`md:hidden text-foreground z-[60] relative bg-background/80 backdrop-blur-sm p-2 rounded-lg transition-opacity ${isMobileMenuOpen ? 'opacity-0 pointer-events-none invisible' : 'opacity-100'}`}
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Full Screen Mobile Menu Overlay */}
        {createPortal(
          <div
            className={`fixed inset-0 z-[70] md:hidden ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'} overscroll-contain`}
            data-no-cursor
            aria-hidden={!isMobileMenuOpen}
            onWheel={(e) => e.preventDefault()}
            onTouchMove={(e) => e.preventDefault()}
          >
            <div
              className={`absolute inset-0 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 bg-black/70 backdrop-blur-md' : 'opacity-0'}`}
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`absolute top-4 right-4 z-[72] inline-flex items-center justify-center rounded-lg bg-transparent text-foreground px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/60 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none invisible'}`}
              >
                <X size={20} />
              </button>

            <div className="relative z-[71] flex h-full items-center justify-center p-6">
              <div className={`w-full max-w-sm transform transition-transform duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-[160%]'}`}>
                <nav className="flex flex-col gap-4 p-4">
                  <Button variant="outline" className="btn-outline-soft w-full py-5 text-xl" onClick={() => scrollToSection('about')}>About</Button>
                  <Button variant="outline" className="btn-outline-soft w-full py-5 text-xl" onClick={() => scrollToSection('skills')}>Skills</Button>
                  <Button variant="outline" className="btn-outline-soft w-full py-5 text-xl" onClick={() => scrollToSection('experience')}>Experience</Button>
                  <Button variant="outline" className="btn-outline-soft w-full py-5 text-xl" onClick={() => scrollToSection('contact')}>Contact</Button>
                </nav>
              </div>
            </div>
          </div>,
          document.body
        )}



      </div>
    </nav>
  );
};

export default Navbar;
