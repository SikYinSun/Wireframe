import React from 'react'

function Dimensions({title, dimensions, type = "number"}) {

  return (
    <div className="border border-gray-300 rounded-md p-4 w-full mt-4">
      <h2 className="font-bold text-lg mb-4"> {title} </h2>
      {dimensions.map((dimension, index) => (
        <div
          key={index}
          className="flex items-center mb-2 border border-gray-300 rounded"
        >
          <div className="bg-gray-300 text-black font-medium text-sm w-1/2 px-2 py-2">
            {dimension.label}
          </div>
          <div className="text-black font-medium text-sm w-1/2 px-2 py-2">
            {type === "number" && dimension.value ? `${dimension.value}"` : `${dimension.value}` || ""}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Dimensions
