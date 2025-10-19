import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <p className="text-center mb-4">
            &copy; {new Date().getFullYear()} BrainWave. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-indigo-400">
              <Facebook size={24} />
            </a>
            <a href="#" className="hover:text-indigo-400">
              <Twitter size={24} />
            </a>
            <a href="#" className="hover:text-indigo-400">
              <Instagram size={24} />
            </a>
            <a href="#" className="hover:text-indigo-400">
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
