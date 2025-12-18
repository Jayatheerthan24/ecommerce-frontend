import { useContext } from "react"
import GlobalContext from "../contexts/GlobalContext"

const Pagination = () => {
    const { currentPage, setCurrentPage } = useContext(GlobalContext)
    const handlePrevious = () => {
        setCurrentPage(currentPage - 1)
        localStorage.setItem("Page", currentPage - 1)
    }
    const handleNext = () => {
        setCurrentPage(currentPage + 1)
        localStorage.setItem("Page", currentPage + 1)
    }
    return (
        <div className="w-[300px] m-4 mx-auto p-4 rounded-md bg-yellow-50 shadow-lg flex flex-row gap-2 justify-center">
            <button className="bg-red-400 text-white p-5 rounded-md " onClick={handlePrevious} >{"<"}</button><br />
            <div className="text-xl bg-yellow-300 rounded-md p-3">{currentPage}</div>
            <button className="bg-red-400 text-white p-5 rounded-md" onClick={handleNext} >{">"}</button><br />
        </div>
    )
}
export default Pagination;