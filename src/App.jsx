import { React, useRef, useState } from 'react'

import './App.css'
import images from './images'
import { BsImage } from 'react-icons/bs'
import { MdCheckBox } from 'react-icons/md'
import ImageCard from './components/ImageCard'

function App() {
  const [stateImages, setStateImages] = useState(images)
  const [selectedItems, setSelectedItems] = useState(0)

  // Functionality of reordering
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleSorting = () => {
    if (dragItem.current == null || dragOverItem.current == null) {
      return
    }
    let _images = [...stateImages];

    let tempImage = _images[dragItem.current]

    _images.splice(dragItem.current, 1)
    _images.splice(dragOverItem.current, 0, tempImage);

    dragItem.current = dragOverItem.current

    dragOverItem.current = null;

    setStateImages(_images);
  };

  // Functionality of selecting image
  const handleChange = key => {
    let temp = stateImages
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].key == key) {
        temp[i].selected = !temp[i].selected;
        if (temp[i].selected) {
          setSelectedItems(selectedItems + 1)
        }
        else {
          setSelectedItems(selectedItems - 1)
        }
        setStateImages(temp)
        break
      }
    }
  }

  // Functionality of removing selection at one
  const handleAllSelect = () => {
    let temp = stateImages
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].selected) {
        temp[i].selected = false
      }
    }
    setStateImages(temp)
    setSelectedItems(0)
  }

  // Functionality of Deleting image or images from grid
  const handleDelete = () => {
    let temp = stateImages
    let i = 0
    while (i < temp.length) {
      if (temp[i].selected) {
        temp.splice(i, 1)
      }
      else {
        i++
      }
    }
    setStateImages(temp)
    setSelectedItems(0)
  }

  return (
    <>
      <div className="bg-white w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 2xl:w-7/12 mt-10 mx-auto flex flex-col rounded-lg">
        <div className='flex justify-between'>
          {selectedItems == 0 && <h3 className='p-5 font-bold'>Gallery</h3>}
          {selectedItems == 1 &&
            <>
              <div className='flex p-5 items-center gap-2'>
                <MdCheckBox className='text-blue-500 cursor-pointer' onClick={handleAllSelect} />
                <h3 className='font-bold'>File Selected</h3>
              </div>
              <button className='p-5 font-bold text-red-800' onClick={handleDelete}>Delete File</button>
            </>
          }
          {selectedItems > 1 &&
            <>
              <div className='flex p-5 items-center gap-2'>
                <MdCheckBox className='text-blue-500 cursor-pointer' onClick={handleAllSelect} />
                <h3 className='font-bold'>Files Selected</h3>
              </div>
              <button className='p-5 font-bold text-red-800' onClick={handleDelete}>Delete Files</button>
            </>
          }
        </div>
        <div className="p-5 border-t-2 grid grid-cols-2 xss:grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 gap-4">
          {stateImages.map((image, index) =>
            <ImageCard key={image.key} image={image} index={index} handleChange={handleChange} handleSorting={handleSorting} dragItem={dragItem} dragOverItem={dragOverItem}
            />
          )}

          <label htmlFor="getImage" className='border-2 rounded-md cursor-pointer flex flex-col items-center justify-center gap-2 min-h-[100px] min-w-[100px]'>
            <BsImage />
            <p>Add Images</p>
          </label>
          <input type='file' id="getImage" className='hidden' />
        </div>
      </div>
    </>
  )
}

export default App
