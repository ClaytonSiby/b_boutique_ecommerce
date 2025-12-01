import { render, screen } from '@testing-library/react';
import AboutPage from '../page';

// Mock Next.js components
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

jest.mock('next/image', () => {
  return ({ src, alt, width, height, className }: any) => {
    return <img src={src} alt={alt} width={width} height={height} className={className} />;
  };
});

describe('AboutPage', () => {
  beforeEach(() => {
    render(<AboutPage />);
  });

  describe('Hero Section', () => {
    it('renders the hero section with the correct heading', () => {
      const heading = screen.getByText(/Crafting Timeless/i);
      expect(heading).toBeInTheDocument();
      expect(screen.getAllByText(/Elegance/i).length).toBeGreaterThan(0);
    });

    it('displays the "OUR STORY" badge', () => {
      expect(screen.getByText('OUR STORY')).toBeInTheDocument();
    });

    it('shows the mission statement', () => {
      expect(screen.getByText(/Since our inception, B Boutique has been dedicated/i)).toBeInTheDocument();
    });

    it('displays all statistics cards', () => {
      expect(screen.getByText('1K+')).toBeInTheDocument();
      expect(screen.getByText('Happy Customers')).toBeInTheDocument();
      
      expect(screen.getByText('100+')).toBeInTheDocument();
      expect(screen.getByText('Premium Products')).toBeInTheDocument();
      
      expect(screen.getByText('4+')).toBeInTheDocument();
      expect(screen.getByText('States Served')).toBeInTheDocument();
      
      expect(screen.getByText('3+')).toBeInTheDocument();
      expect(screen.getByText('Years Experience')).toBeInTheDocument();
    });
  });

  describe('Story Section', () => {
    it('renders the journey heading', () => {
      expect(screen.getAllByText(/Our/).length).toBeGreaterThan(0);
      expect(screen.getByText(/Journey/i)).toBeInTheDocument();
    });

    it('displays the story image', () => {
      const images = screen.getAllByRole('img');
      const storyImage = images.find(img => img.getAttribute('alt') === 'Our Story');
      expect(storyImage).toBeInTheDocument();
      expect(storyImage).toHaveAttribute('src', '/assets/images/colour_dress.jpg');
    });

    it('shows the company description', () => {
      expect(screen.getByText(/Benedetto Luxury Boutique is a destination for timeless style/i)).toBeInTheDocument();
    });

    it('displays quality commitment badges', () => {
      expect(screen.getByText('Premium Quality')).toBeInTheDocument();
      expect(screen.getByText('Sustainable Fashion')).toBeInTheDocument();
      expect(screen.getByText('Country Wide Presence')).toBeInTheDocument();
    });
  });

  describe('Values Section', () => {
    it('renders the values section heading', () => {
      expect(screen.getByText('WHAT WE STAND FOR')).toBeInTheDocument();
      expect(screen.getByText(/Our Core/)).toBeInTheDocument();
      expect(screen.getAllByText(/Values/i).length).toBeGreaterThan(0);
    });

    it('displays all three core values', () => {
      expect(screen.getByText('Quality First')).toBeInTheDocument();
      expect(screen.getByText(/We never compromise on quality/i)).toBeInTheDocument();
      
      expect(screen.getByText('Customer Love')).toBeInTheDocument();
      expect(screen.getByText(/Our customers are at the heart/i)).toBeInTheDocument();
      
      expect(screen.getByText('Sustainability')).toBeInTheDocument();
      expect(screen.getByText(/We are committed to sustainable practices/i)).toBeInTheDocument();
    });
  });

  describe('Team Section', () => {
    it('renders the team section heading', () => {
      expect(screen.getByText('OUR TEAM')).toBeInTheDocument();
      expect(screen.getByText(/Meet The/)).toBeInTheDocument();
      expect(screen.getByText(/Experts/i)).toBeInTheDocument();
    });

    it('displays team member information', () => {
      expect(screen.getByText('Khomotso Penani')).toBeInTheDocument();
      expect(screen.getByText('Founder & CEO')).toBeInTheDocument();
      
      expect(screen.getByText('Clayton Siby')).toBeInTheDocument();
      expect(screen.getByText('Lead Software Engineer')).toBeInTheDocument();
    });

    it('shows team member images', () => {
      const images = screen.getAllByRole('img');
      const founderImage = images.find(img => img.getAttribute('src') === '/assets/images/founder_image.jpg');
      const engineerImage = images.find(img => img.getAttribute('src') === '/assets/images/head_of_engineering.jpg');
      
      expect(founderImage).toBeInTheDocument();
      expect(engineerImage).toBeInTheDocument();
    });
  });

  describe('CTA Section', () => {
    it('renders the call-to-action heading', () => {
      expect(screen.getByText(/Join Our Fashion/i)).toBeInTheDocument();
      expect(screen.getByText(/Community/i)).toBeInTheDocument();
    });

    it('displays CTA description', () => {
      expect(screen.getByText(/Be part of a movement that values quality/i)).toBeInTheDocument();
    });

    it('shows action buttons with correct links', () => {
      const shopButton = screen.getByText('Shop Collection').closest('a');
      const contactButton = screen.getByText('Get in Touch').closest('a');
      
      expect(shopButton).toHaveAttribute('href', '/products');
      expect(contactButton).toHaveAttribute('href', '/contact');
    });
  });

  describe('Overall Structure', () => {
    it('renders all main sections in correct order', () => {
      const sections = screen.getAllByRole('generic').filter(el => 
        el.tagName === 'SECTION'
      );
      
      // Should have Hero, Story, Values, Team, and CTA sections
      expect(sections.length).toBeGreaterThanOrEqual(5);
    });

    it('has proper page wrapper with minimum height', () => {
      const pageWrapper = screen.getByText(/Crafting Timeless/i);
      const rootDiv = pageWrapper.closest('[class*="min-h-screen"]');
      expect(rootDiv).toBeInTheDocument();
    });
  });
});
