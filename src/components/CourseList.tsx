// components/CourseList.tsx
import React, { useEffect, useState } from 'react';

interface Course {
  title: string;
  price: number;
  image: string;
}

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/courses')
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error('Error fetching courses:', error));
  }, []);

  return (
    <div>
      <h1>Available Courses</h1>
      <div>
        {courses.map((course) => (
          <div key={course.title}>
            <h3>{course.title}</h3>
            <p>Price: ${course.price}</p>
            <img src={course.image} alt={course.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
