
import React, { useState , useEffect} from 'react';
import axios from 'axios';


const Landing: React.FC = () => {


    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [courses, setCourses] = useState<any[]>([]);

    useEffect(() => {
      // Fetch courses data from the API (replace with your actual API endpoint)
      fetch('http://localhost:3000/courses')
      .then((response) => response.json())
        .then((data) => setCourses(data))
        .catch((error) => console.error("Error fetching courses:", error));
    }, []);

    
    const toggleMobileMenu = () => {
      setMobileMenuOpen(!mobileMenuOpen);
    };
  

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/contact', { email, message }); // Send fromEmail instead of email
            setSuccessMessage('Message sent successfully!');
            setEmail(''); // Clear sender's email after sending
            setMessage('');
        } catch (error) {
            setErrorMessage('Failed to send message. Please try again later.');
        }
    };
                
  return (
    <>
  <header className='sticky top-0 z-999999'>
    <nav className="sticky bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
    
                <img src="/src/images/LogoBridge.png" className="mr-3 h-6 sm:h-14" alt="Flowbite Logo" />
            <div className="flex items-center lg:order-2">
 
     

                
            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded={mobileMenuOpen}
            >
          <span className="sr-only">Open main menu</span>
          <svg className={`w-6 h-6 ${mobileMenuOpen ? 'hidden' : 'block'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
          </svg>
          <svg className={`w-6 h-6 ${mobileMenuOpen ? 'block' : 'hidden'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
          </svg>
        </button>

        {/* Mobile Menu */}
            </div>
            <div className={` ${mobileMenuOpen ? '' : 'hidden'} justify-between items-center w-full lg:flex lg:w-auto lg:order-1`} id="mobile-menu-2">
               
            </div>
        </div>
    </nav>
</header>
<section
  className="relative bg-cover bg-center bg-no-repeat h-screen"
  style={{ backgroundImage: "url('/src/images/background.jpg')" }}
>
  <div className="absolute inset-0 bg-black bg-opacity-50"></div>
  <div className="relative flex flex-col items-center justify-center h-full text-center text-black px-4">
    <div className="bg-white bg-opacity-80 rounded-none p-8 shadow-lg max-w-xl">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">
        Improve your skills on your own 
        <br />To prepare for a better future
      </h1>
      <a
        href="#"
        className="inline-block px-12 py-3 text-lg font-semibold text-white bg-primary rounded-full hover:bg-pink-700 focus:ring-4 focus:ring-pink-300"
      >
        REGISTER NOW
      </a>
    </div>
  </div>
</section>


<section className="bg-white">
  <div className="max-w-screen-xl mx-auto py-8 px-6">
    <div className="flex justify-between items-center mb-12">
      <h2 className="text-4xl font-extrabold text-black">Discover Our Courses</h2>
      <a
        href="#"
        className="text-white bg-[#b32852] hover:bg-opacity-90 font-semibold rounded-full text-sm px-6 py-2.5"
      >
        View More
      </a>
    </div>
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {/* Map over courses data to dynamically create cards */}
          {courses.map((course) => (
            <div key={course.id} className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
              <img
                src={course.image || "/default-image.jpg"} // Use the course's image or a default one
                alt={course.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{course.title}</h3>
                <p className="text-pink-600 text-lg font-semibold">{course.price} DT/ Month</p>
              </div>
            </div>
          ))}
        </div>

  </div>
</section>

    

<section className="bg-white dark:bg-gray-800 mb-12">
  <div className="max-w-4xl mx-auto py-10 px-6 rounded-3xl bg-[#f9b453]">
    <h2 className="text-center text-2xl font-bold mb-6 text-black">Contact Us</h2>
    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mx-auto max-w-md">
        <label htmlFor="name" className="block text-sm font-semibold text-black mb-1">
          NAME
        </label>
        <input
          id="name"
          type="text"
          placeholder="Jiara Martins"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full py-2 px-4 rounded-full bg-[#fce9c9] border-none focus:ring-2 focus:ring-black focus:outline-none"
          required
        />
      </div>

      <div className="mx-auto max-w-md">
        <label htmlFor="email" className="block text-sm font-semibold text-black mb-1">
          EMAIL
        </label>
        <input
          id="email"
          type="email"
          placeholder="hello@reallygreatsite.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full py-2 px-4 rounded-full bg-[#fce9c9] border-none focus:ring-2 focus:ring-black focus:outline-none"
          required
        />
      </div>

      <div className="mx-auto max-w-md">
        <label htmlFor="message" className="block text-sm font-semibold text-black mb-1">
          MESSAGE
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="Write your message here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full py-2 px-4 rounded-3xl bg-[#fce9c9] border-none focus:ring-2 focus:ring-black focus:outline-none"
          required
        ></textarea>
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="text-white bg-[#b32852] hover:bg-opacity-90 font-medium rounded-full text-sm px-6 py-2.5"
        >
          Send the message
        </button>
      </div>
    </form>
  </div>
</section>


   
    </>
  );
};

export default Landing;
