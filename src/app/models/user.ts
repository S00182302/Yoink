export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  password: string;
  location: string;
  email: string;
  posts: [];
  savedPosts: [];
  followers: [];
  following: [];
  // __v: number;
}
