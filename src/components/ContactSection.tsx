
import { useState } from "react";
import { Mail, MapPin, Send, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { socialPlatforms } from "@/constants";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="bg-gray-50 section-padding">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <div className="h-1 w-20 bg-portfolio-primary mx-auto mb-6"></div>
          <p className="text-lg text-portfolio-gray max-w-3xl mx-auto">
            Have a project in mind or want to discuss potential opportunities? 
            I'm always open to new ideas and collaborations. Let's connect!
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-8 h-full">
              <h3 className="text-2xl font-bold mb-6 heading-gradient">Contact Info</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="text-portfolio-primary mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h4 className="font-medium text-lg mb-1">Email</h4>
                    <a href="mailto:contact@example.com" className="text-portfolio-gray hover:text-portfolio-primary transition-colors">
                      muhammadkh303@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <MapPin className="text-portfolio-primary mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h4 className="font-medium text-lg mb-1">Location</h4>
                    <p className="text-portfolio-gray">
                      Available for work worldwide
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <MessageSquare className="text-portfolio-primary mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h4 className="font-medium text-lg mb-1">Social</h4>
                    <div className="flex space-x-4 mt-2">
                      {socialPlatforms.map((platform:{href:string,name:string}) => (
                        <a
                          key={platform.href}
                          href="#"
                          className="text-portfolio-gray hover:text-portfolio-primary transition-colors"
                        >
                          {platform.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-100">
                <h4 className="font-medium text-lg mb-3">Availability</h4>
                <p className="text-portfolio-gray mb-4">
                  I'm currently available for  full-time positions.
                </p>
                <div className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-3 rounded-lg text-sm">
                  <span className="font-medium">Currently Available</span> - Ready to start your project!
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-portfolio-primary focus:border-portfolio-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-portfolio-primary focus:border-portfolio-primary"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-portfolio-primary focus:border-portfolio-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-portfolio-primary focus:border-portfolio-primary"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex items-center justify-center bg-portfolio-primary hover:bg-sky-600 text-white font-medium py-3 px-8 rounded-md transition duration-300 shadow-md hover:shadow-lg ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={16} className="ml-2" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
