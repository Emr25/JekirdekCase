import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8 mt-4">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap">
                    <div className="w-full md:w-1/3 px-4 py-2">
                        <h5 className="text-xl font-semibold">About Us</h5>
                        <p className="mt-2 text-gray-400">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
                        </p>
                    </div>
                    <div className="w-full md:w-1/3 px-4 py-2">
                        <h5 className="text-xl font-semibold">Contact</h5>
                        <p className="mt-2 text-gray-400">
                            Email: info@example.com <br />
                            Phone: +1 123 456 7890
                        </p>
                    </div>
                    <div className="w-full md:w-1/3 px-4 py-2">
                        <h5 className="text-xl font-semibold">Follow Us</h5>
                        <p className="mt-2 text-gray-400">
                            Facebook | Twitter | Instagram
                        </p>
                    </div>
                </div>
                <div className="mt-6 border-t border-gray-700 pt-6 text-center">
                    <p>&copy; 2024 MyAwesomeSite. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;