# Wise Leaders Fellowship Website

Landing page for the Wise Leaders Fellowship.

## Structure

```
├── index.html              Main page (loads sections)
├── css/
│   └── styles.css          All styles
├── sections/
│   ├── nav.html            Navigation
│   ├── hero.html           Hero section
│   ├── manifesto.html      Manifesto statement
│   ├── features.html       Three architectures
│   ├── dark-statement.html Dark section (silence)
│   ├── testimonial.html    Testimonial quote
│   ├── cta.html            Call to action
│   └── footer.html         Footer
```

## Development

Open `index.html` in a browser. Due to CORS, you'll need a local server:

```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve
```

Then visit `http://localhost:8000`

## Deployment

Push to GitHub and connect to Netlify or Vercel for auto-deploy.

## Design System

- **Fonts:** Crimson Pro (headlines), DM Sans (body)
- **Colors:** See CSS variables in `styles.css`
- **Reference:** WLF Brand Design System v1.0
