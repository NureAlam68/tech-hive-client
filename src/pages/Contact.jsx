import { useState } from "react";
import { Mail, Phone, MapPin, Loader2 } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Input change handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form validation
  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setMessage("");
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating API request
      setMessage("Your message has been sent successfully!");
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-950 px-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-8 max-w-2xl w-full border dark:border-gray-600">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Contact Us</h1>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-6">We&apos;d love to hear from you!</p>

        {message && <p className="text-green-600 text-center mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Write your message"
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Message"}
          </button>
        </form>

        {/* Contact Info */}
        <div className="mt-6 text-center">
          <p className="flex items-center justify-center text-gray-700 dark:text-gray-300">
            <Mail className="w-5 h-5 mr-2" /> contact@techhive.com
          </p>
          <p className="flex items-center justify-center text-gray-700 dark:text-gray-300 mt-2">
            <Phone className="w-5 h-5 mr-2" /> +8801921342610
          </p>
          <p className="flex items-center justify-center text-gray-700 dark:text-gray-300 mt-2">
            <MapPin className="w-5 h-5 mr-2" /> Dhaka, Bangladesh
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
