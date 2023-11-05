import React from 'react'
import CheckBox from './CheckBox'

function ImageCard({ image, index, handleChange, handleSorting, dragItem, dragOverItem }) {
    return (
        <div
            className={`border-2 rounded-md ${index == 0 && "col-span-2 row-span-2"} relative `}
            draggable
            onDragStart={() => (dragItem.current = index)}
            onDragEnter={() => { dragOverItem.current = index; handleSorting() }}
            onDragEnd={() => dragItem.current = null}
            onDragOver={(e) => e.preventDefault()}
        >
            <CheckBox imgKey={image.key} selected={image.selected} handleChange={handleChange} />
            <img
                src={image.img}
                alt='img'
                className='rounded-md w-full h-full'
            />
        </div>
    )
}

export default ImageCard