// mockData.ts

// Define a type for user
export type User = {
    id: number
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'Student' | 'Teacher' | 'Organisation Admin' | 'Super User';
  };
  
  // Array of mock users
  const mockUsers: User[] = [
    {
      id: 1,
      username: 'student1',
      firstName: 'student1',
      lastName: 'studentlastname1',
      email: 'student1@mail.com',
      password: 'student1pass',
      role: 'Student',
    },
    {
      id: 10,
      username: 'teacher1',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      password: 'teacherpassword',
      role: 'Teacher',
    },
    {
      id: 20,
      username: 'admin1',
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      password: 'adminpassword',
      role: 'Organisation Admin',
    },
    {
      id: 30,
      username: 'superuser',
      firstName: 'Super',
      lastName: 'User',
      email: 'super@super.com',
      password: 'superpassword',
      role: 'Super User',
    }
  ];
  
  export default mockUsers;
  