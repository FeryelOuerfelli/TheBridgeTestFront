// components/AdminPage.tsx
import React, { useState } from 'react';

const AdminPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newCourse = { title, price, image };

    try {
      const response = await fetch('http://localhost:3000/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCourse),
      });
      if (response.ok) {
        console.log('Course added successfully');
      }
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  return (
    <div>
      <h1>Admin: Add a Course</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default AdminPage;
