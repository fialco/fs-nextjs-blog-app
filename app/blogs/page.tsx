import { getBlogs } from "../services/blogs";

const Notes = () => {
  const blogs = getBlogs();
  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            {blog.author}: {blog.title} - Likes: {blog.likes}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Notes;
