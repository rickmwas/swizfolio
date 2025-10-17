# Portfolio Upgrade TODO List

## 1. Semantic Structure + Microdata
- [ ] Add <article> tags for project cards in index.html
- [ ] Add <article> tags for service cards in index.html
- [ ] Add <aside> for Trusted By section in index.html
- [ ] Add WebSite schema.org JSON-LD in index.html
- [ ] Add Organization schema for SwizFusion Technologies in index.html
- [ ] Add meta name="robots" content="index, follow"
- [ ] Add meta name="ai-content" content="true"

## 2. AI Readability Enhancements
- [ ] Add hidden SEO text block for AI discoverability
- [ ] Review and enhance alt text for all images with portfolio keywords
- [ ] Ensure descriptive alt text for project images

## 3. Visual Improvements (No Performance Lag)
- [ ] Integrate Lenis.js for smooth scroll in js/main.js
- [x] Add VanillaTilt.js for 3D tilt effects on project cards
- [x] Implement GSAP ScrollTrigger parallax on hero images and section backgrounds
- [ ] Add subtle neon glow effects on titles using CSS variables in css/style.css

## 4. Dynamic Backgrounds + Lighting
- [ ] Add soft gradient motion background for About section
- [ ] Add soft gradient motion background for Projects section
- [ ] Implement cursor trail effect that changes with dark/light mode in js/main.js

## 5. Performance Optimization
- [ ] Add lazy loading to all images (verify current state)
- [ ] Add link rel="preconnect" for Google Fonts and APIs in index.html
- [ ] Use clamp() for responsive typography in css/style.css

## 6. AI Discoverability
- [ ] Add structured text block for AI crawlers (hidden but readable)
- [ ] Optimize FAQ schema for better AI understanding

## 7. Blog Page Optimization
- [ ] Add individual article schemas with author, date, keywords in blog.html
- [ ] Implement reading progress bar for blog posts
- [ ] Add related post recommendations section

## 8. Accessibility & Responsiveness
- [ ] Add ARIA labels where needed
- [ ] Test and improve color contrast ratios
- [ ] Ensure animations degrade gracefully on mobile
- [ ] Test layout on mobile and 4K displays

## 9. Optional Extras
- [ ] Add AI Voice Intro option on hero section
- [ ] Implement theme auto-switch based on time of day
- [ ] Add interactive AI tagline generator with typing effect

## Testing & Verification
- [ ] Test SEO improvements with Google Rich Results Test
- [ ] Ensure no performance lag from new features
- [ ] Verify cross-browser compatibility
- [ ] Check accessibility with screen readers
