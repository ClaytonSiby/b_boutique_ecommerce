// Font Awesome Configuration
import { config, library } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

// Import icons from different packages
import {
    faShoppingCart,
    faUser,
    faSearch,
    faBars,
    faTimes,
    faHeart,
    faStar,
    faStarHalfAlt,
    faShippingFast,
    faHeadset,
    faUndo,
    faEnvelope,
    faPhone,
    faMapMarkerAlt,
    faCheck,
    faChevronRight,
    faChevronLeft,
    faQuoteLeft,
    faQuoteRight,
    faCreditCard,
    faTruck,
    faGlobe,
} from '@fortawesome/free-solid-svg-icons';

import {
    faStar as farStar,
    faHeart as farHeart,
    faEnvelope as farEnvelope,
} from '@fortawesome/free-regular-svg-icons';

import {
    faFacebook,
    faTwitter,
    faInstagram,
    faPinterest,
    faLinkedin,
    faYoutube,
    faCcVisa,
    faCcMastercard,
    faCcAmex,
    faCcPaypal,
    faCcApplePay,
} from '@fortawesome/free-brands-svg-icons';

// Tell Font Awesome to skip adding the CSS automatically since we're importing it manually
config.autoAddCss = false;

// Add icons to the library so you can use them throughout your app
library.add(
    // Solid icons
    faShoppingCart,
    faUser,
    faSearch,
    faBars,
    faTimes,
    faHeart,
    faStar,
    faStarHalfAlt,
    faShippingFast,
    faHeadset,
    faUndo,
    faEnvelope,
    faPhone,
    faMapMarkerAlt,
    faCheck,
    faChevronRight,
    faChevronLeft,
    faQuoteLeft,
    faQuoteRight,
    faCreditCard,
    faTruck,
    faGlobe,
    // Regular icons
    farStar,
    farHeart,
    farEnvelope,
    // Brand icons
    faFacebook,
    faTwitter,
    faInstagram,
    faPinterest,
    faLinkedin,
    faYoutube,
    faCcVisa,
    faCcMastercard,
    faCcAmex,
    faCcPaypal,
    faCcApplePay,
);
