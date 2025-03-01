import React, { useState } from 'react';
import { Send, Sparkles, Mail, MessageSquare, BookOpen } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  const [activeField, setActiveField] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="relative min-h-screen flex items-center bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 py-16">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full mix-blend-overlay filter blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-200/30 rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-200/30 rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Floating icons */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 animate-float">
          <Mail className="w-12 h-12 text-blue-400/20" />
        </div>
        <div className="absolute top-40 right-20 animate-float-delay-2">
          <MessageSquare className="w-8 h-8 text-blue-400/20" />
        </div>
        <div className="absolute bottom-32 left-1/4 animate-float-delay-3">
          <BookOpen className="w-10 h-10 text-blue-400/20" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="px-4 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium inline-flex items-center">
              <span className="w-2 h-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
              Get in Touch
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500">
            Let's Connect
          </h2>
          <p className="text-xl text-blue-700 max-w-2xl mx-auto font-light">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-2xl blur group-hover:blur-xl transition-all duration-300 opacity-50"></div>
          <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-blue-100">
            {isSubmitted && (
              <div className="absolute inset-0 bg-white/90 backdrop-blur-xl flex items-center justify-center z-10 rounded-2xl">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-800">Message Sent!</h3>
                  <p className="text-blue-600">We'll get back to you soon.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    onFocus={() => setActiveField('firstName')}
                    onBlur={() => setActiveField('')}
                    className="w-full px-4 py-3 rounded-lg bg-white border border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 text-blue-900 placeholder-blue-300 transition-all duration-200 peer"
                    placeholder=" "
                    required
                  />
                  <label className="absolute left-4 top-3 text-blue-600 transition-all duration-200 -translate-y-7 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-7 peer-focus:text-blue-600 text-sm">
                    First Name
                  </label>
                </div>
                <div className="relative group">
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    onFocus={() => setActiveField('lastName')}
                    onBlur={() => setActiveField('')}
                    className="w-full px-4 py-3 rounded-lg bg-white border border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 text-blue-900 placeholder-blue-300 transition-all duration-200 peer"
                    placeholder=" "
                    required
                  />
                  <label className="absolute left-4 top-3 text-blue-600 transition-all duration-200 -translate-y-7 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-7 peer-focus:text-blue-600 text-sm">
                    Last Name
                  </label>
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-4 top-3 text-blue-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setActiveField('email')}
                  onBlur={() => setActiveField('')}
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-white border border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 text-blue-900 placeholder-blue-300 transition-all duration-200 peer"
                  placeholder=" "
                  required
                />
                <label className="absolute left-12 top-3 text-blue-600 transition-all duration-200 -translate-y-7 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-7 peer-focus:text-blue-600 text-sm">
                  Email Address
                </label>
              </div>

              <div className="relative">
                <div className="absolute left-4 top-3 text-blue-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setActiveField('subject')}
                  onBlur={() => setActiveField('')}
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-white border border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 text-blue-900 placeholder-blue-300 transition-all duration-200 peer"
                  placeholder=" "
                  required
                />
                <label className="absolute left-12 top-3 text-blue-600 transition-all duration-200 -translate-y-7 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-7 peer-focus:text-blue-600 text-sm">
                  Subject
                </label>
              </div>

              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setActiveField('message')}
                  onBlur={() => setActiveField('')}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 text-blue-900 placeholder-blue-300 transition-all duration-200 peer"
                  placeholder=" "
                  required
                />
                <label className="absolute left-4 top-3 text-blue-600 transition-all duration-200 -translate-y-7 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-7 peer-focus:text-blue-600 text-sm">
                  Your Message
                </label>
              </div>

              <button
                type="submit"
                className="group w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-200 flex items-center justify-center"
              >
                <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-float-delay-2 {
    animation: float 7s ease-in-out infinite;
    animation-delay: 2s;
  }
  
  .animate-float-delay-3 {
    animation: float 8s ease-in-out infinite;
    animation-delay: 4s;
  }
  
  .delay-1000 {
    animation-delay: 1s;
  }
  
  .delay-2000 {
    animation-delay: 2s;
  }
`;
document.head.appendChild(style);

export default Contact;