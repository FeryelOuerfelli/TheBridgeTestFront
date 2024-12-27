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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal visibility for delete confirmation
  const [courseToDelete, setCourseToDelete] = useState(null); // Store course to delete
  const [showAddCourseModal, setShowAddCourseModal] = useState(false); // Modal visibility for adding course
  const [showEditCourseModal, setShowEditCourseModal] = useState(false); // Modal visibility for editing course
  const [courseToEdit, setCourseToEdit] = useState(null); // Store course to edit

  useEffect(() => {
    fetch('http://localhost:3000/courses')
      .then((response) => response.json())
      .then((data) => setCourses(data));
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
      const response = await axios.put(`http://localhost:3000/courses/${course.id}`, course);  // Use course.id or course._id correctly here
      setCourses(courses.map((c) => (c._id === course.id ? response.data : c))); // Update the course in the list
      setShowEditCourseModal(false); // Close the modal after editing the course
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

  const exportToExcel = () => {
    // Export logic for Excel
  };

  const exportToPDF = () => {
    // Export logic for PDF
  };

  return (
    <div className="flex">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div
        className={`flex-1 p-6 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}
      >
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 bg-gray-700 text-white rounded-md"
          >
            &#9776; {/* Hamburger icon */}
          </button>
          <h2 className="text-2xl font-semibold">Manage Courses</h2>
          <div className="flex items-center space-x-4">
            <button onClick={exportToExcel} className="bg-[#1C6F55] text-white py-2 px-4 rounded-md">
              Export to Excel
            </button>
            <button onClick={exportToPDF} className="bg-[#bf2d2d] text-white py-2 px-4 rounded-md">
              Export to PDF
            </button>
            <button onClick={openAddCourseModal} className="bg-[#1C6F55] text-white py-2 px-4 rounded-md">
              <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Course
            </button>
          </div>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={handleSearch}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className="px-4 py-3">{course.title}</td>
                  <td className="px-4 py-3">{course.price}</td>
                  <td className="px-4 py-3">
                    <img src={course.image} alt={course.title} className="w-20 h-20 object-cover" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => openEditCourseModal(course)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(course)}
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

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={showModal}
        onCancel={closeDeleteModal}
        onConfirm={() => handleDelete(courseToDelete._id)}
        courseTitle={courseToDelete?.title}
      />

      {/* Add Course Modal */}
      <AddCourseModal
        isOpen={showAddCourseModal}  // Ensure isOpen is set to the correct state
        onCancel={closeAddCourseModal}  // Close the modal when clicking "Cancel"
        onAdd={addCourse}  // Handle adding course
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
