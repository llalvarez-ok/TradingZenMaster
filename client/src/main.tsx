import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Adding meta tags for SEO
const metaDescription = document.createElement('meta');
metaDescription.name = 'description';
metaDescription.content = 'Trading Zen - Domina el arte del trading online con nuestra metodología única que combina análisis técnico y equilibrio emocional. Cursos profesionales para traders de todos los niveles.';
document.head.appendChild(metaDescription);

// Adding Open Graph tags for better social media sharing
const ogTitle = document.createElement('meta');
ogTitle.property = 'og:title';
ogTitle.content = 'Trading Zen - Domina el arte del trading online';
document.head.appendChild(ogTitle);

const ogDescription = document.createElement('meta');
ogDescription.property = 'og:description';
ogDescription.content = 'Aprende estrategias avanzadas de trading, gestión emocional y análisis técnico para convertirte en un trader consistente y rentable.';
document.head.appendChild(ogDescription);

const ogType = document.createElement('meta');
ogType.property = 'og:type';
ogType.content = 'website';
document.head.appendChild(ogType);

// Set page title
document.title = 'Trading Zen - Domina el arte del trading online';

createRoot(document.getElementById("root")!).render(<App />);
