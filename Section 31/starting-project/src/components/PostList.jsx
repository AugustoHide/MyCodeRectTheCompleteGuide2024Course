import { useLoaderData } from "react-router-dom";
import Post from "./Post";
import classes from "./Posts.module.css";

export default function PostList() {
  const posts = useLoaderData();

  return (
    <>
      {posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              author={post.author}
              body={post.body}
            />
          ))}
        </ul>
      )}
      {posts.length === 0 && (
        <h2 style={{ textAlign: "center" }}>
          There are no posts yet. Create one
        </h2>
      )}
    </>
  );
}
