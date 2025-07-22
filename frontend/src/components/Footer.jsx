import React from 'react';

const Footer = () => {
	return (
		<footer
			id="contact"
			className="bg-gray-800 text-white py-10 text-sm">
			<div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between">
				<div>
					<h4 className="text-lg font-bold">GRAAMVAANI</h4>
					<p className="text-gray-400 mt-2">Digitally connecting rural India</p>
				</div>
				<div className="space-y-1 mt-6 md:mt-0">
					<p>Email: support@GRAAMVAANI .in</p>
					<p>Phone: +91 98765 43210</p>
					<p>Address: Rural Tech HQ, India</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
