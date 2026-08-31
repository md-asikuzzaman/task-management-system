import { useParams, useSearchParams } from "react-router-dom";

function Blog() {
  const { id } = useParams();

  const [searchParams] = useSearchParams();
  const ids = searchParams.get("id");
  const name = searchParams.get("name");

  return (
    <>
      <h1>Blog ID: {id}</h1>
      <p>ID: {ids}</p>
      <p>Name: {name}</p>
    </>
  );
}

export default Blog;
