import React, { useState, useEffect } from 'react';
import Sidebar from '../components/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import AddCourseModal from '../components/AddCourseModal';
import EditCourseModal from '../components/EditCourseModal';

const AdminDashboard = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false); // Modal visibility for delete confirmation
  const [courseToDelete, setCourseToDelete] = useState(null); // Store course to delete
  const [showAddCourseModal, setShowAddCourseModal] = useState(false); // Modal visibility for adding course
  const [showEditCourseModal, setShowEditCourseModal] = useState(false); // Modal visibility for editing course
  const [courseToEdit, setCourseToEdit] = useState(null); // Store course to edit

  useEffect(() => {
    axios.get('http://localhost:3000/courses').then((response) => {
      setCourses(response.data);
    });
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/courses/${id}`);
      setCourses(courses.filter((course) => course._id !== id)); // Remove deleted course from state
      setShowModal(false); // Close delete modal
    } catch (error) {
      console.error('Error deleting course:', error.response?.data || error.message);
    }
  };

  const openDeleteModal = (course) => {
    setCourseToDelete(course); // Set the course to delete
    setShowModal(true); // Show delete modal
  };

  const closeDeleteModal = () => {
    setShowModal(false); // Close the delete modal
    setCourseToDelete(null); // Reset the course to delete
  };

  const openAddCourseModal = () => {
    setShowAddCourseModal(true); // Show Add Course modal
  };

  const closeAddCourseModal = () => {
    setShowAddCourseModal(false); // Close Add Course modal
  };

  const addCourse = async (course) => {
    try {
      const formData = new FormData();
      formData.append('title', course.title);
      formData.append('price', course.price);
      if (course.image) {
        formData.append('image', course.image);
      }

      const response = await axios.post('http://localhost:3000/courses', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setCourses([...courses, response.data]);
      setShowAddCourseModal(false);
    } catch (error) {
      console.error('Error adding course:', error.response?.data || error.message);
    }
  };

 
  const editCourse = async (course) => {
    try {
      const formData = new FormData();
      formData.append('title', course.title);
      formData.append('price', course.price.toString());
  
      if (course.image && typeof course.image !== 'string') {
        formData.append('image', course.image);
      } else if (typeof course.image === 'string') {
        formData.append('image', course.image); // Pass the string directly
      }
  
      const response = await axios.put(`http://localhost:3000/courses/${course.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      setCourses(courses.map((c) => (c._id === course.id ? response.data : c)));
      setShowEditCourseModal(false);
    } catch (error) {
      console.error('Error editing course:', error.response?.data || error.message);
    }
  };
  

  const openEditCourseModal = (course) => {
    if (!course._id) {
      console.error('Course has no valid ID');
      return;
    }
    console.log('Course to edit:', course);  // Check the course object

    setCourseToEdit(course); // Set the course to edit
    setShowEditCourseModal(true); // Show Edit Course modal
  };
  
  
  const closeEditCourseModal = () => {
    setShowEditCourseModal(false); // Close the Edit Course modal
    setCourseToEdit(null); // Reset the course to edit
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  

  return (
    <div className="flex">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={`flex-1 p-6 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-900">Manage Courses</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={openAddCourseModal}
              className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-6 rounded-lg transition duration-300 ease-in-out"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Course
            </button>
          </div>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={handleSearch}
            className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
          />
        </div>

        <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-yellow-100 text-left">
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">Title</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">Price</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">Image</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course, index) => (
                <tr key={index} className={`border-t ${index % 2 === 0 ? 'bg-gray-50' : ''} hover:bg-gray-100`}>
                  <td className="px-4 py-3">{course.title}</td>
                  <td className="px-4 py-3">{course.price} DT/Month</td>
                  <td className="px-4 py-3">
                    <img src={course.image} alt={course.title} className="w-16 h-16 object-cover rounded-lg" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => openEditCourseModal(course)}
                        className="text-yellow-600 hover:text-yellow-800 transition duration-300"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(course)}
                        className="text-red-500 hover:text-red-700 transition duration-300"
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

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={showModal}
        onCancel={closeDeleteModal}
        onConfirm={() => handleDelete(courseToDelete._id)}
        courseTitle={courseToDelete?.title}
      />

      {/* Add Course Modal */}
      <AddCourseModal
        isOpen={showAddCourseModal} 
        onCancel={closeAddCourseModal} 
        onAdd={addCourse} 
      />

      {/* Edit Course Modal */}
      <EditCourseModal
        show={showEditCourseModal}
        onClose={closeEditCourseModal}
        onEdit={editCourse}
        courseToEdit={courseToEdit}
      />
    </div>
  );
};

export default AdminDashboard;
