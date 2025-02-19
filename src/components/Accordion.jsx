import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// eslint-disable-next-line react/prop-types
const AccordionItem = ({ title, content, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0 dark:bg-gray-950 dark:border dark:border-gray-600">
      <button
        className="w-full px-4 md:px-6 lg:px-8 py-4 flex items-center justify-between text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
        onClick={onToggle}
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">{title}</h3>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ease-in-out ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-950">
          <p className="text-gray-600 leading-relaxed dark:text-gray-300">{content}</p>
        </div>
      </div>
    </div>
  );
};

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const accordionData = [
    {
      title: "What is TechHive?",
      content: "TechHive is a cutting-edge platform where tech enthusiasts can discover and share the latest technology products. From web applications to AI tools, software solutions to mobile apps, our community-driven platform helps users stay at the forefront of technological innovation."
    },
    {
      title: "How does product submission work?",
      content: "Users can easily submit their tech products through our intuitive submission process. Simply create an account, click on 'Submit Product', and provide details about your innovation. Our moderation team ensures quality control while maintaining quick review turnaround times."
    },
    {
      title: "What are the benefits of Premium Membership?",
      content: "Premium members enjoy exclusive features including early access to new products, detailed analytics, priority support, and special promotional opportunities. Plus, premium members can take advantage of our coupon system for additional savings."
    },
    {
      title: "How does the review system work?",
      content: "Our transparent review system allows users to share their experiences with products. Reviews are verified and moderated to ensure authenticity. Users can rate products, provide detailed feedback, and help others make informed decisions."
    },
    {
      title: "What makes TechHive different?",
      content: "TechHive stands out through its community-first approach, robust moderation system, and comprehensive feature set. With real-time statistics, personalized dashboards, and seamless integration of modern technologies, we provide an unmatched platform for tech product discovery."
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-[1600px] mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden mb-10 md:mb-20">
      {accordionData.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index}
          onToggle={() => toggleAccordion(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;