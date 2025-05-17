import { Link } from 'wouter';
import { 
  ChartLine, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube 
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#334155] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <ChartLine className="text-2xl text-accent" />
              <span className="text-2xl font-bold">Trading Zen</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Transformamos traders ordinarios en profesionales consistentes a través de estrategias probadas y una mentalidad equilibrada.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                className="bg-white/10 hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://twitter.com" 
                className="bg-white/10 hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="https://instagram.com" 
                className="bg-white/10 hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://youtube.com" 
                className="bg-white/10 hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#inicio" className="text-gray-300 hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/#ventajas" className="text-gray-300 hover:text-white transition-colors">
                  Ventajas
                </Link>
              </li>
              <li>
                <Link href="/#testimonios" className="text-gray-300 hover:text-white transition-colors">
                  Testimonios
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-gray-300 hover:text-white transition-colors">
                  Cursos Gratuitos
                </Link>
              </li>
              <li>
                <Link href="/#registro-form" className="text-gray-300 hover:text-white transition-colors">
                  Registro
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/legal" className="text-gray-300 hover:text-white transition-colors">
                  Aviso Legal
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-300 hover:text-white transition-colors">
                  Política de Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Trading Zen. Todos los derechos reservados.
          </p>
          <p className="text-gray-400 text-sm mt-4 md:mt-0">
            Diseñado y desarrollado con <span className="text-red-500">❤</span> por Trading Zen
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
