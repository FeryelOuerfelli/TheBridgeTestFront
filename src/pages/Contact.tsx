import { useState, useEffect } from 'react';
import Sidebar from '../components/SideBar';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// Define the type for the contact message
interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [contacts, setContacts] = useState<Contact[]>([]); // Type the contacts state

  useEffect(() => {
    // Fetch contact messages from the backend API
    axios.get('http://localhost:3000/contact')
      .then((response) => {
        setContacts(response.data); // Update the state with the fetched data
      })
      .catch((error) => {
        console.error('Error fetching contact messages:', error);
      });
  }, []);

  return (
    <div className="flex">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={`flex-1 p-6 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Contact Messages</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3">Actions</th>


              </tr>
            </thead>
            <tbody>
              {/* Render each contact message */}
              {contacts.map((contact) => (
                <tr key={contact._id} className="border-b">
                  <td className="px-4 py-3">{contact.name}</td>
                  <td className="px-4 py-3">{contact.email}</td>
                  <td className="px-4 py-3">{contact.message}</td>
                                    <td className="px-4 py-3">
                                      <div className="flex items-center space-x-2">
                                        <button
                                          className="text-yellow-600 hover:text-yellow-800"
                                        >
                                          <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button
                                          className="text-red-500"
                                        >
                                          <FontAwesomeIcon icon={faTrashAlt} />
                                        </button>
                                      </div>
                                    </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Contact;
