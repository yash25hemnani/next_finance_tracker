"use client"

const CategoryBox = ({ text, color, icon:Icon, setCurrent, setColor }) => {
    const handleClick = () => {
        setShowBudget(true)
        setCurrent(text)
        setColor(color)
    }

    return (
        <div onClick={() => handleClick()} className="flex items-center justify-between gap-3 bg-[#1e1e1e] p-4 rounded-xl shadow-sm w-1/2 lg:w-1/6">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: color }}>
                {Icon}
            </div>
            <span className="text-sm font-medium text-white">{text}</span>
        </div>
    )
}

export default CategoryBox;