const blogs = [
  {
    id: 1,
    title: "next.js utilizes React Server Components",
    author: "Nexter",
    url: "nextjs.org",
    likes: 11,
  },
  {
    id: 2,
    title: "next.js is built on top of React",
    author: "J.S",
    url: "react.dev",
    likes: 22,
  },
  {
    id: 3,
    title: "next.js supports both static and dynamic rendering",
    author: "N.J",
    url: "tailwindcss.com",
    likes: 33,
  },
];

let nextId = 4;

export const getBlogs = () => {
  return blogs;
};

export const addBlog = (title: string, author: string, url: string) => {
  blogs.push({ id: nextId++, title, author, url, likes: 0 });
};
