// mockData.ts

// Define a type for user
export type User = {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'Student' | 'Teacher' | 'Organisation Admin';
  };
  
  // Array of mock users
  const mockUsers: User[] = [
    {
      username: 'student1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      role: 'Student',
    },
    {
      username: 'teacher1',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      password: 'teacherpassword',
      role: 'Teacher',
    },
    {
      username: 'admin1',
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      password: 'adminpassword',
      role: 'Organisation Admin',
    },
  ];
  
  export default mockUsers;
  