import PageHeader from "./components/PageHeader";

const Home = () => {
  return (
    <div>
      <div className="mb-4">
        <PageHeader title="Blog app" /> A practice app for{" "}
        <a
          href="https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-nextjs"
          className="text-blue-600 hover:underline"
        >
          Full Stack Open Next.js
        </a>
      </div>
      <div>
        See{" "}
        <a
          href="https://github.com/fialco/fs-nextjs-blog-app"
          className="text-blue-600 hover:underline"
        >
          https://github.com/fialco/fs-nextjs-blog-app
        </a>{" "}
        for the source code
      </div>
    </div>
  );
};
export default Home;
