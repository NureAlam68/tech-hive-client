import { ArrowRight, Newspaper } from 'lucide-react';

const TechNews = () => {
    return (
        <section className="py-20 bg-gray-50 dark:bg-slate-950">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-gray-200">
                        Latest Tech News
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                        Stay updated with the latest trends and innovations
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        {
                            title: "The Future of AI in 2025",
                            category: "Artificial Intelligence",
                            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
                            date: "Mar 15, 2024",
                            readTime: "5 min read",
                            link: "https://www.technologyreview.com/topic/artificial-intelligence/"
                        },
                        {
                            title: "Web Development Trends",
                            category: "Development",
                            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
                            date: "Mar 14, 2024",
                            readTime: "4 min read",
                            link: "https://web.dev/blog/"
                        },
                        {
                            title: "Cloud Computing Revolution",
                            category: "Cloud",
                            image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8",
                            date: "Mar 13, 2024",
                            readTime: "6 min read",
                            link: "https://cloud.google.com/blog/"
                        },
                        {
                            title: "Cybersecurity Essentials",
                            category: "Security",
                            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
                            date: "Mar 12, 2024",
                            readTime: "7 min read",
                            link: "https://www.wired.com/category/security/"
                        }
                    ].map((news, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 dark:bg-gray-900">
                            <img
                                src={news.image}
                                alt={news.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{news.category}</span>
                                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                                        <Newspaper className="w-4 h-4 mr-1" />
                                        {news.readTime}
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2 dark:text-white">{news.title}</h3>
                                <p className="text-gray-600 text-sm dark:text-gray-400">{news.date}</p>
                                <a
                                    href={news.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                                >
                                    Read Article
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechNews;