'use client'

import { toast } from "react-toastify"
import { ChangeEvent, FormEvent, useState } from 'react'

import { api } from "@/lib/api"

type FilePickerProps = {
  loading: boolean;
	handleLoading: (state: boolean) => void;  
}

export function FilePicker(props: FilePickerProps) {
  const [file, setFile] = useState<Boolean>(false)

  async function handleFileInputChange(event: ChangeEvent<HTMLInputElement>) {
    const {files} = event.target

    files ? setFile(true) : setFile(false)
  }

  async function handleSendFile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    props.handleLoading(true)

    // Obtaining the selected file
    const formData = new FormData(event.currentTarget)
    const fileToUpload = formData.get('file_input')

    if (fileToUpload) {
      // Setting the file as the formdata to send as multipart form data
      const uploadFormData = new FormData()
      uploadFormData.set('file', fileToUpload)

      try {
        const uploadResponse = await api.post('/uploads', uploadFormData)
        if (uploadResponse.status == 200) {
          toast.success(uploadResponse.data.message)
        } else if (uploadResponse.status == 400) {
          toast.info(uploadResponse.data.message)
        }
      } catch (err: any) {
        toast.error(err.response.data.message)
      }
      
      setFile(false)

    } else toast.info('Escolha um arquivo válido')

    props.handleLoading(false)
  }

  return (
    <form 
      onSubmit={handleSendFile} 
      className='flex-1 flex justify-center items-center bg-white-150 top-5 py-10 px-20 gap-10'>
      <div>
        <input 
          type="file" 
          id="file_input"
          accept="image/*"
          name="file_input"
          aria-describedby="file_input_help" 
          onChange={handleFileInputChange}
          className="block w-[400px] text-sm text-gray-100 border border-gray-100 rounded-sm cursor-pointer bg-white-100 focus:outline-none"
        />
        <label 
          id="file_input_help"
          className="mt-1 text-sm text-gray-200" 
        >
          PNG, JPG, GIF, ou SVG (Somente imagens).
        </label>
      </div>

      <div>
        <button 
          type="submit"
          disabled={!file}
          className='bg-blue-500 hover:bg-blue-700 text-white-50 disabled:bg-opacity-30 disabled:hover:bg-blue-500 disabled:hover:bg-opacity-30 font-bold py-2 px-4 rounded h-12 w-24'
          >
            Enviar
        </button>
      </div>
    </form>
  )
}
