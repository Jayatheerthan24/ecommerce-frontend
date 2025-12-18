import { useEffect, useState } from "react";
import { useParams } from "react-router";

const BlogDetails = () => {
    const { id } = useParams()

    const [blogData, setblogData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            const data = await res.json()
            console.log(data)
            setblogData(data)
        }
        fetchData()
    }, [id])
    return (
        <>
            <div className="bg-pink-300 w-[400px] mx-auto p-5 mt-10 rounded-[15px]">
                <h1><strong>ID:</strong> {blogData.id}</h1>
                <h1><strong>UserId:</strong> {blogData.userId}</h1>
                <h1><strong>Title:</strong> {blogData.title}</h1>
                <h1><strong>Body:</strong> {blogData.body}</h1>
            </div>
        </>
    )
}
export default BlogDetails;