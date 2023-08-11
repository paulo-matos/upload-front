/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { toast } from 'react-toastify'
import { ChangeEvent, FormEvent, useState } from 'react'

import { api } from '@/lib/api'

type FilePickerProps = {
  loading: boolean
  handleLoading: (state: boolean) => void
}

export function FilePicker(props: FilePickerProps) {
  const [file, setFile] = useState<boolean>(false)

  async function handleFileInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

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
        if (uploadResponse.status === 200) {
          toast.success(uploadResponse.data.message)
        } else if (uploadResponse.status === 400) {
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
      className="top-5 flex flex-1 items-center justify-center gap-10 bg-white-150 px-20 py-10"
    >
      <div>
        <input
          type="file"
          id="file_input"
          accept="image/*"
          name="file_input"
          aria-describedby="file_input_help"
          onChange={handleFileInputChange}
          className="block w-[400px] cursor-pointer rounded-sm border border-gray-100 bg-white-100 text-sm text-gray-100 focus:outline-none"
        />
        <label id="file_input_help" className="mt-1 text-sm text-gray-200">
          PNG, JPG, GIF, ou SVG (Somente imagens).
        </label>
      </div>

      <div>
        <button
          type="submit"
          disabled={!file}
          className="h-12 w-24 rounded bg-blue-500 px-4 py-2 font-bold text-white-50 hover:bg-blue-700 disabled:bg-opacity-30 disabled:hover:bg-blue-500 disabled:hover:bg-opacity-30"
        >
          Enviar
        </button>
      </div>
    </form>
  )
}
