// src/components/Footer.jsx
function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10 border-t border-gray-700">
      <div className="container mx-auto text-center">
        <p className="text-sm mb-2">
          &copy; 2024 <a href="/" className="font-bold hover:underline">Forest Fire Alert System</a>. All rights reserved.
        </p>
        <p className="text-sm">
          <a href="/privacy-policy" className="hover:underline">Privacy Policy</a> | 
          <a href="/terms" className="hover:underline"> Terms of Service</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;

