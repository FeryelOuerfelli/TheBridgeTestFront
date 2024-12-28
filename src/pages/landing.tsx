
import React, { useState , useEffect} from 'react';
import axios from 'axios';


const Landing: React.FC = () => {


    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    interface Course {
      id: string;
      title: string;
      image?: string;
      price: number;
    }
    
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
      // Fetch courses data from the API (replace with your actual API endpoint)
      fetch('http://localhost:3000/courses')
      .then((response) => response.json())
        .then((data) => setCourses(data))
        .catch((error) => console.error("Error fetching courses:", error));
    }, []);

    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          await axios.post('http://localhost:3000/contact', { name, email, message });
          setSuccessMessage('Message sent successfully!');
            setEmail(''); 
            setName(''); 
            setMessage('');
        } catch (error) {
            setErrorMessage('Failed to send message. Please try again later.');
        }
    };
                
  return (
    <>
  <header className='sticky top-0 z-999999'>
    <nav className="sticky bg-white border-gray-200 px-4 lg:px-6 pt-2.5 pb-8 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
    
                <img src="/src/images/LogoBridge.png" className="mr-3 h-6 sm:h-14" alt="Logo" />
            <div className="flex items-center lg:order-2">
 
     

            </div>
        </div>
    </nav>
</header>
<section
  className="relative bg-cover bg-center bg-no-repeat h-screen"
  style={{ backgroundImage: "url('/src/images/background1.jpg')" }}
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
                src={course.image || "/default-image.jpg"} 
                alt={course.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h3 className="text-3xl font-bold text-black py-4 px-4">{course.title}</h3>
                <p className="text-pink-600 text-2xl font-semibold py-4 px-6">{course.price} DT/ Month</p>
              </div>
            </div>
          ))}
        </div>

  </div>
</section>

    

<section className="bg-white dark:bg-gray-800 mb-12 py-8">
  <div className="max-w-4xl mx-auto py-6 px-6 rounded-3xl bg-[#f9b453]">
    <h2 className="text-center text-4xl font-bold mb-6 text-black">Contact Us</h2>
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
          rows={2}
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
          className="text-white bg-[#b32852] hover:bg-opacity-90 font-semibold rounded-lg text-sm px-10 py-1.5"
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
