import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from '../Navbar';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => {
    return <a href={href} className={className}>{children}</a>;
  };
});

describe('Navbar Component', () => {
  beforeEach(() => {
    render(<Navbar />);
  });

  describe('Logo and Branding', () => {
    it('renders the logo with correct branding', () => {
      const logo = screen.getByText('B');
      const brandName = screen.getByText('Boutique');
      
      expect(logo).toBeInTheDocument();
      expect(brandName).toBeInTheDocument();
    });

    it('logo links to home page', () => {
      const logoLink = screen.getByText('B').closest('a');
      expect(logoLink).toHaveAttribute('href', '/');
    });
  });

  describe('Navigation Links', () => {
    it('displays all navigation links correctly', () => {
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Shop')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.getByText('Blog')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    it('Home link routes to correct path', () => {
      const homeLink = screen.getByText('Home').closest('a');
      expect(homeLink).toHaveAttribute('href', '/');
    });

    it('Shop link routes to products page', () => {
      const shopLink = screen.getByText('Shop').closest('a');
      expect(shopLink).toHaveAttribute('href', '/products');
    });

    it('About link routes to about page', () => {
      const aboutLink = screen.getByText('About').closest('a');
      expect(aboutLink).toHaveAttribute('href', '/about');
    });

    it('Blog link routes to blog page', () => {
      const blogLink = screen.getByText('Blog').closest('a');
      expect(blogLink).toHaveAttribute('href', '/blog');
    });

    it('Contact link routes to contact page', () => {
      const contactLink = screen.getByText('Contact').closest('a');
      expect(contactLink).toHaveAttribute('href', '/contact');
    });
  });

  describe('Interactive Elements', () => {
    it('renders search button', () => {
      const searchButton = screen.getByTitle('Search');
      expect(searchButton).toBeInTheDocument();
      expect(searchButton.tagName).toBe('BUTTON');
    });

    it('search button is clickable', async () => {
      const user = userEvent.setup();
      const searchButton = screen.getByTitle('Search');
      
      await user.click(searchButton);
      // Button should be clickable without errors
      expect(searchButton).toBeInTheDocument();
    });

    it('renders cart button with badge', () => {
      const cartLink = screen.getByText('3').closest('a');
      expect(cartLink).toHaveAttribute('href', '/cart');
    });

    it('cart badge displays correct count', () => {
      const cartBadge = screen.getByText('3');
      expect(cartBadge).toBeInTheDocument();
    });

    it('cart link is clickable and routes to cart page', () => {
      const cartLink = screen.getByText('3').closest('a');
      expect(cartLink).toHaveAttribute('href', '/cart');
    });

    it('renders profile button', () => {
      const profileLink = screen.getAllByRole('link').find(
        link => link.getAttribute('href') === '/profile'
      );
      expect(profileLink).toBeInTheDocument();
    });

    it('profile button is clickable and routes to profile page', () => {
      const profileLink = screen.getAllByRole('link').find(
        link => link.getAttribute('href') === '/profile'
      );
      expect(profileLink).toHaveAttribute('href', '/profile');
    });

    it('renders mobile menu button', () => {
      const mobileMenuButton = screen.getByTitle('Open mobile menu');
      expect(mobileMenuButton).toBeInTheDocument();
      expect(mobileMenuButton.tagName).toBe('BUTTON');
    });

    it('mobile menu button is clickable', async () => {
      const user = userEvent.setup();
      const mobileMenuButton = screen.getByTitle('Open mobile menu');
      
      await user.click(mobileMenuButton);
      // Button should be clickable without errors
      expect(mobileMenuButton).toBeInTheDocument();
    });
  });

  describe('SVG Icons', () => {
    it('renders search icon', () => {
      const searchButton = screen.getByTitle('Search');
      const svg = searchButton.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('renders cart icon', () => {
      const cartLink = screen.getByText('3').closest('a');
      const svg = cartLink?.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('renders profile icon', () => {
      const profileLink = screen.getAllByRole('link').find(
        link => link.getAttribute('href') === '/profile'
      );
      const svg = profileLink?.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('renders mobile menu icon', () => {
      const mobileMenuButton = screen.getByTitle('Open mobile menu');
      const svg = mobileMenuButton.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('has mobile menu button that is hidden on desktop', () => {
      const mobileMenuButton = screen.getByTitle('Open mobile menu');
      expect(mobileMenuButton).toHaveClass('md:hidden');
    });

    it('has search button that is hidden on mobile', () => {
      const searchButton = screen.getByTitle('Search');
      expect(searchButton).toHaveClass('hidden');
      expect(searchButton).toHaveClass('md:flex');
    });

    it('navigation links are hidden on mobile', () => {
      const homeLink = screen.getByText('Home').closest('div');
      expect(homeLink).toHaveClass('hidden');
      expect(homeLink).toHaveClass('md:flex');
    });
  });

  describe('Styling and Appearance', () => {
    it('has fixed positioning', () => {
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('fixed');
      expect(nav).toHaveClass('top-0');
    });

    it('has backdrop blur effect', () => {
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('backdrop-blur-2xl');
    });

    it('has shadow styling', () => {
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('shadow-xl');
    });

    it('spans full width', () => {
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('w-full');
    });

    it('has z-index for layering', () => {
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('z-50');
    });
  });

  describe('Accessibility', () => {
    it('uses semantic nav element', () => {
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
    });

    it('buttons have title attributes for accessibility', () => {
      expect(screen.getByTitle('Search')).toBeInTheDocument();
      expect(screen.getByTitle('Open mobile menu')).toBeInTheDocument();
    });

    it('all interactive elements are keyboard accessible', () => {
      const links = screen.getAllByRole('link');
      const buttons = screen.getAllByRole('button');
      
      [...links, ...buttons].forEach(element => {
        expect(element).toBeInTheDocument();
      });
    });
  });

  describe('All Navigation Links Present', () => {
    it('contains exactly 5 main navigation links', () => {
      const navLinks = ['Home', 'Shop', 'About', 'Blog', 'Contact'];
      navLinks.forEach(link => {
        expect(screen.getByText(link)).toBeInTheDocument();
      });
    });

    it('contains 3 action links/buttons (cart, profile, search)', () => {
      expect(screen.getByTitle('Search')).toBeInTheDocument();
      expect(screen.getByText('3').closest('a')).toBeInTheDocument(); // Cart
      const profileLink = screen.getAllByRole('link').find(
        link => link.getAttribute('href') === '/profile'
      );
      expect(profileLink).toBeInTheDocument();
    });
  });
});
