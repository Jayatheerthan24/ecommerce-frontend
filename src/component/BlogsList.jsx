import { useEffect, useState } from "react";
import { Link } from "react-router";

const BlogsList = () => {
    const [blogData, setblogData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("https://jsonplaceholder.typicode.com/posts")
            const data = await res.json()
            console.log(data)
            setblogData(data)
        }
        fetchData()
    }, [])
    return (
        <>
            <div className="mx-auto mt-10 flex justify-center items-start flex-wrap">
                {blogData.map((bdata) => {
                    return (
                        // <BlogDetails id={bdata.id}/>
                        <Link to={`/blogs/${bdata.id}`}>
                            <div className="p-4">
                                <div className="w-[300px] bg-pink-300 border-gray-400 border rounded-xl">
                                    <div className="p-5 text-center">
                                        <h1 className="font-bold text-2xl ">{bdata.id}</h1>
                                        <h3 className="font-semibold text-3xl">{bdata.title}</h3>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })
                }
            </div>
        </>
    )
}

export default BlogsList;