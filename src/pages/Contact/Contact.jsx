import { toast, ToastContainer } from "react-toastify";


const Contact = () => {
    const handleContact = (e) => {
        e.preventDefault();
        toast.success('Message Sent');
        e.target.name.value = ''
        e.target.email.value = ''
        e.target.message.value = ''
    }
    return (
        <div className="bg-gray-100 text-gray-800">
            <ToastContainer/>
        <div className="container mx-auto px-6 py-12">
          {/* Heading Section */}
          <div className="text-center mb-10">
          <h1 className="text-4xl font-medium">Contact Us</h1>
          <p className="text-gray-600 mt-4">
          Have questions? We’d love to hear from you. Get in touch!
          </p>
        </div>
  
          {/* Contact Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 shadow rounded-lg">
              <h2 className="text-2xl font-medium mb-6">Send Us a Message</h2>
              <form onSubmit={handleContact} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm lg:text-[16px] lg:mb-1 font-medium text-gray-700">Your Name</label>
                  <input type="text" id="name" name="name" placeholder="Enter your name" className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm lg:text-[16px] lg:mb-1 font-medium text-gray-700">Your Email</label>
                  <input type="email" id="email" name="email" placeholder="Enter your email" className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm lg:text-[16px] lg:mb-1 font-medium text-gray-700">Your Message</label>
                  <textarea id="message" name="message" rows="5" placeholder="Write your message" className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300">Send Message</button>
              </form>
            </div>
  
            {/* Contact Details */}
            <div className="space-y-6">
              <div className="bg-white p-6 shadow rounded-lg">
                <h3 className="text-xl font-medium">Our Address</h3>
                <p className="mt-2 text-gray-600">123 Lodgio Street, Cityname, Country</p>
              </div>
              <div className="bg-white p-6 shadow rounded-lg">
                <h3 className="text-xl font-medium">Call Us</h3>
                <p className="mt-2 text-gray-600">+88 016-0126-2260</p>
              </div>
              <div className="bg-white p-6 shadow rounded-lg">
                <h3 className="text-xl font-medium">Email Us</h3>
                <p className="mt-2 text-gray-600">support@lodgio.com</p>
              </div>
            </div>
          </div>
  
          
        </div>
      </div>
    );
};

export default Contact;