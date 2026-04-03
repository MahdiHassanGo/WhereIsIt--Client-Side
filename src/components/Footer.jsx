import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="relative pt-24 pb-12 border-t border-white/5 mt-20">
            {/* Background blur decorative element */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-primary/5 blur-[120px] pointer-events-none -z-10"></div>
            
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    
                    {/* Brand Section */}
                    <div className="col-span-1 lg:col-span-1">
                        <Link to="/" className="inline-block mb-6 group">
                           <span className="text-3xl font-heading font-extrabold text-gradient group-hover:drop-shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all">
                             WhereIsIt.
                           </span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-xs">
                            A community-driven platform connecting personal belongings with their rightful owners. Report, search, and recover with ease.
                        </p>
                        <div className="flex gap-4">
                            {[FaFacebook, FaTwitter, FaInstagram, FaYoutube].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary transition-all duration-300 shadow-lg">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-heading font-bold text-lg mb-8">Navigation</h4>
                        <ul className="space-y-4">
                            {['Home', 'Lost & Found', 'All Items', 'About Us', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link to="/" className="text-slate-400 hover:text-secondary text-sm transition-colors flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-secondary transition-colors"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-white font-heading font-bold text-lg mb-8">Support</h4>
                        <ul className="space-y-4">
                            {['Terms & Conditions', 'Privacy Policy', 'Reporting Guide', 'Safety Tips'].map((item) => (
                                <li key={item}>
                                    <Link to="/" className="text-slate-400 hover:text-accent text-sm transition-colors flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-accent transition-colors"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-heading font-bold text-lg mb-8">Get in Touch</h4>
                        <div className="space-y-5">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center shrink-0 text-primary border border-white/5">
                                    <FaEnvelope size={16} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 mb-1 uppercase tracking-widest font-bold">Email Us</p>
                                    <p className="text-slate-300 text-sm">support@whereisit.com</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center shrink-0 text-secondary border border-white/5">
                                    <FaPhone size={16} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 mb-1 uppercase tracking-widest font-bold">Call Us</p>
                                    <p className="text-slate-300 text-sm">+880 1234 567890</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-xs">
                        © {new Date().getFullYear()} <span className="text-slate-300">WhereIsIt</span>. All rights reserved.
                    </p>
                    <div className="flex gap-8">
                        <Link to="/" className="text-[10px] uppercase tracking-widest font-bold text-slate-500 hover:text-white transition-colors">Design Excellence</Link>
                        <Link to="/" className="text-[10px] uppercase tracking-widest font-bold text-slate-500 hover:text-white transition-colors">Premium UI</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
