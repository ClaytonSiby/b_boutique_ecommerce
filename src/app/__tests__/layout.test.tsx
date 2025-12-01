import { render, screen } from '@testing-library/react';
import Navbar from '@/components/Navbar';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => {
    return <a href={href} className={className}>{children}</a>;
  };
});

// Test the integration by rendering the Navbar (which is used in the layout) separately
describe('Navbar Integration in Layout', () => {
  beforeEach(() => {
    render(<Navbar />);
  });

  it('renders the Navbar component with all navigation links', () => {
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Shop')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('Navbar navigation links route correctly', () => {
    const homeLink = screen.getByText('Home').closest('a');
    const shopLink = screen.getByText('Shop').closest('a');
    const aboutLink = screen.getByText('About').closest('a');
    const blogLink = screen.getByText('Blog').closest('a');
    const contactLink = screen.getByText('Contact').closest('a');
    
    expect(homeLink).toHaveAttribute('href', '/');
    expect(shopLink).toHaveAttribute('href', '/products');
    expect(aboutLink).toHaveAttribute('href', '/about');
    expect(blogLink).toHaveAttribute('href', '/blog');
    expect(contactLink).toHaveAttribute('href', '/contact');
  });

  it('Navbar is fixed and positioned correctly for all pages', () => {
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('fixed');
    expect(nav).toHaveClass('top-0');
    expect(nav).toHaveClass('z-50');
  });

  it('Navbar spans full width', () => {
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('w-full');
  });

});

describe('Navbar Persistence Across Pages', () => {
  it('Navbar maintains same structure when used on different pages', () => {
    // First render
    const { rerender } = render(<Navbar />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Shop')).toBeInTheDocument();
    
    // Rerender (simulating page change but Navbar persists)
    rerender(<Navbar />);
    
    // Navbar links should still be present
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Shop')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('Navbar interactive elements remain functional across renders', () => {
    const { rerender } = render(<Navbar />);
    
    // Check interactive elements exist initially
    expect(screen.getByTitle('Search')).toBeInTheDocument();
    expect(screen.getByText('3').closest('a')).toHaveAttribute('href', '/cart');
    
    // Rerender
    rerender(<Navbar />);
    
    // Elements should still be present and functional
    expect(screen.getByTitle('Search')).toBeInTheDocument();
    expect(screen.getByText('3').closest('a')).toHaveAttribute('href', '/cart');
    
    const profileLink = screen.getAllByRole('link').find(
      link => link.getAttribute('href') === '/profile'
    );
    expect(profileLink).toBeInTheDocument();
  });
});
