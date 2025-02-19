import { Search, Heart, Upload, ThumbsUp } from 'lucide-react';

const HowWorks = () => {
    return (
        <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              How TechHive Works
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Discover, share, and explore the latest tech products in just a few steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: Search,
                title: "Discover",
                description: "Browse through our curated collection of tech products",
                color: "text-blue-600",
                bgColor: "bg-blue-100"
              },
              {
                icon: Heart,
                title: "Save Favorites",
                description: "Bookmark products you're interested in",
                color: "text-pink-600",
                bgColor: "bg-pink-100"
              },
              {
                icon: Upload,
                title: "Submit Products",
                description: "Share your discoveries with the community",
                color: "text-purple-600",
                bgColor: "bg-purple-100"
              },
              {
                icon: ThumbsUp,
                title: "Review & Rate",
                description: "Help others make informed decisions",
                color: "text-green-600",
                bgColor: "bg-green-100"
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className={`mx-auto w-16 h-16 ${step.bgColor} rounded-full flex items-center justify-center mb-4`}>
                  <step.icon className={`w-8 h-8 ${step.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
};

export default HowWorks;