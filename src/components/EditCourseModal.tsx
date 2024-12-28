import React, { useState, useEffect } from 'react';

interface EditCourseModalProps {
  show: boolean;
  onClose: () => void;
  onEdit: (course: { _id: string; title: string; price: number; image: File | string | null }) => void;
  courseToEdit: { _id: string; title: string; price: number; image: string } | null;
}

const EditCourseModal: React.FC<EditCourseModalProps> = ({
  show,
  onClose,
  onEdit,
  courseToEdit,
}) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<File | string | null>(null);

  useEffect(() => {
    if (courseToEdit) {
      setTitle(courseToEdit.title);
      setPrice(courseToEdit.price);
      setImage(courseToEdit.image);
    }
  }, [courseToEdit]);

 
  if (!show || !courseToEdit) return null;

  const handleSubmit = () => {
    if (!title || price <= 0) {
      alert('Please provide valid title and price.');
      return;
    }
  
    const updatedCourse = { id: courseToEdit._id, title, price , image };
  
    if (image) {
      if (typeof image === 'string') {
        // Keep the existing image URL
        updatedCourse.image = image;
      } else {
        // Add the new file to update
        updatedCourse.image = image;
      }
    }
  
    onEdit(updatedCourse);
    onClose();
  };
  
  
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h3 className="text-xl font-semibold mb-4">Edit Course</h3>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              placeholder="Course Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="price">
              Price
            </label>
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="image">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
            {image && typeof image === 'string' && (
              <img src={image} alt="course" className="mt-2 w-32 h-32 object-cover" />
            )}

          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-black rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourseModal;
