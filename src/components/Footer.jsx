import { Link } from 'react-router-dom';
import { HiChip } from 'react-icons/hi';
import { BiNetworkChart } from 'react-icons/bi';
import { FaGithub, FaTwitter, FaLinkedin, FaDiscord } from 'react-icons/fa';
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-200 pt-16 pb-8 dark:bg-gray-900">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="relative">
                <HiChip className="text-3xl text-primary" />
                <BiNetworkChart className="text-lg text-accent absolute -bottom-1 -right-1" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl">
                  <span className="text-primary">Tech</span>
                  <span className="text-accent">Hive</span>
                </span>
                <span className="text-xs text-gray-500 -mt-1">Innovation Hub</span>
              </div>
            </Link>
            <p className="text-base-content/80 dark:text-gray-400">
              Empowering innovators to showcase and discover cutting-edge technology products.
              Join our community of tech enthusiasts and stay ahead in the digital revolution.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 dark:text-gray-200">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-primary transition-colors dark:text-gray-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-primary transition-colors dark:text-gray-400">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors dark:text-gray-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-primary transition-colors dark:text-gray-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-primary transition-colors dark:text-gray-400">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4 dark:text-gray-200">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <MdLocationOn className="text-primary text-xl" />
                <span className='dark:text-gray-400'>Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2">
                <MdPhone className="text-primary text-xl" />
                <a href="tel:+1234567890" className="hover:text-primary transition-colors dark:text-gray-400">
                  +8801921342610
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MdEmail className="text-primary text-xl" />
                <a href="mailto:contact@techhive.com" className="hover:text-primary transition-colors dark:text-gray-400">
                  contact@techhive.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4 dark:text-gray-200">Stay Updated</h3>
            <p className="mb-4 dark:text-gray-400">Subscribe to our newsletter for the latest tech updates.</p>
            <div className="form-control">
              {/* <div className="input-group">
                <input
                  type="email"
                  placeholder="Your email"
                  className="input input-bordered w-full"
                />
                <button className="btn btn-primary mt-3 text-white">
                  Subscribe
                </button>
              </div> */}
            </div>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="divider dark:border-b"></div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-base-content/80 dark:text-gray-400">
            © {currentYear} TechHive. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a
              href="https://github.com/techhive"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-primary transition-colors dark:text-blue-500"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://twitter.com/techhive"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-primary transition-colors dark:text-blue-500"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com/company/techhive"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-primary transition-colors dark:text-blue-500"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://discord.gg/techhive"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-primary transition-colors dark:text-blue-500"
              aria-label="Discord"
            >
              <FaDiscord />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;