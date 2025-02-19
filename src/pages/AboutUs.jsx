
import { Github, Twitter, Linkedin, Mail, Globe2, Sparkles, Shield, Users, BarChart3, Rocket } from 'lucide-react';
import about from "../assets/about.jpg"

function AboutUs() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-cover bg-center" 
      style={{
        backgroundImage: `url(${about})`,
      }}
      >
        <div className="absolute inset-0 bg-black opacity-50 pattern-grid-lg"></div>
        <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-200 tracking-tight mb-4">
              Welcome to <span className="text-blue-600">TechHive</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-300 leading-relaxed">
              Your ultimate hub for discovering and sharing the latest tech innovations. Join our community of tech enthusiasts, developers, and entrepreneurs.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-12 dark:bg-gray-900 border dark:border dark:border-gray-600">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed dark:text-gray-300">
            At TechHive, we&apos;re building a thriving community where innovation meets collaboration. Our platform empowers users to share, discover, and discuss the most exciting tech products, creating a dynamic ecosystem for the future of technology.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            { icon: <Globe2 className="w-8 h-8" />, title: "Comprehensive Listings", description: "Discover everything from AI tools to cutting-edge software" },
            { icon: <Users className="w-8 h-8" />, title: "Vibrant Community", description: "Connect with fellow tech enthusiasts and innovators" },
            { icon: <Shield className="w-8 h-8" />, title: "Secure & Reliable", description: "Enterprise-grade security for your peace of mind" },
            { icon: <BarChart3 className="w-8 h-8" />, title: "Advanced Analytics", description: "Gain valuable insights through detailed statistics" }
          ].map((feature, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-200 hover:scale-105 dark:bg-gray-900 border dark:border dark:border-gray-600">
              <div className="text-blue-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 dark:text-gray-100">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* What We Offer Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-xl p-8 text-white mb-12">
          <div className="flex items-center mb-6">
            <Sparkles className="w-8 h-8 mr-3" />
            <h2 className="text-3xl font-bold">What We Offer</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <Rocket className="w-6 h-6 mr-3 mt-1 flex-shrink-0" />
                <p>Product Submission & Interaction with seamless upvoting and reviewing</p>
              </div>
              <div className="flex items-start">
                <Users className="w-6 h-6 mr-3 mt-1 flex-shrink-0" />
                <p>Personalized Dashboards for Users, Moderators, and Admins</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <Sparkles className="w-6 h-6 mr-3 mt-1 flex-shrink-0" />
                <p>Premium Memberships with exclusive benefits and features</p>
              </div>
              <div className="flex items-start">
                <BarChart3 className="w-6 h-6 mr-3 mt-1 flex-shrink-0" />
                <p>Comprehensive Analytics Dashboard for data-driven insights</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 dark:bg-gray-900 border dark:border dark:border-gray-600">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 dark:text-gray-100">Connect With Us</h2>
          <div className="flex flex-wrap gap-6 items-center justify-center md:justify-start">
            <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors dark:text-blue-600">
              <Twitter className="w-6 h-6" />
              <span>Twitter</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors dark:text-blue-600">
              <Github className="w-6 h-6" />
              <span>GitHub</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors dark:text-blue-600">
              <Linkedin className="w-6 h-6" />
              <span>LinkedIn</span>
            </a>
            <a href="mailto:contact@techhive.com" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors dark:text-blue-600">
              <Mail className="w-6 h-6" />
              <span>contact@techhive.com</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;