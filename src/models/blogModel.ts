import {useState} from "react";

const BlogModel = () => {
  const [id, setId] = useState(0)

  return {
    id,
    setId
  }
}

export default BlogModel
