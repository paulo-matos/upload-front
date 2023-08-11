'use client'

import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'

import { useEffect, useState } from 'react'

import { api } from '@/lib/api'
import { toast } from 'react-toastify'
import { Download, XOctagon } from 'lucide-react'
import Image from 'next/image'

// Setting up date format
dayjs.locale(ptBr)

interface Upload {
    id: string
    fileName: string
    path: string
    createdAt: string
}

type TableContentProps = {
    loading: boolean;
    handleLoading: (state: boolean) => void;  
}

export function TableContents(props: TableContentProps) {    
    const [uploads, setUploads] = useState<Upload[]>([])

    async function loadUploads() {    
        try {
            const response = await api.get('/uploads')
            setUploads(response.data)
        } catch (err:any) {
            toast.error(err.response.data.message)
        }    
    }

    const deleteFile = async (idFile: string) => {
        props.handleLoading(true)
        
        try {
            await api.delete(`/uploads/${idFile}`)
            toast.success('Arquivo deletado com sucesso!')
        } catch (err:any) {
            toast.error(err.response.data.message)
        }

        props.handleLoading(false)
    }

    const downloadImage = async (url:string, filename:string) => {
        const data = await fetch(url)
        const blob = await data.blob()
        const objectUrl = URL.createObjectURL(blob)
    
        const link = document.createElement('a')
    
        link.setAttribute('href', objectUrl)
        link.setAttribute('download', filename)
        link.style.display = 'none'
    
        document.body.appendChild(link)
      
        link.click()
      
        document.body.removeChild(link)
    }

    useEffect(() => {
        !props.loading && loadUploads()
    }, [props.loading])

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="p-4">
                            Imagem
                        </th>
                        <th scope="col" className="pl-8 py-3">
                            Nome do arquivo
                        </th>
                        <th scope="col" className="px-3 py-3">
                            Data do envio
                        </th>
                        <th scope="col" className="px-3 py-3">
                            Baixar
                        </th>
                        <th scope="col" className="px-3 py-3">
                            Deletar
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {uploads.map((upload) => {
                        return (
                            <tr className="bg-white border-b hover:bg-white-150" key={upload.id}>
                                <td className="w-48 p-4">
                                    <div className="flex items-center">
                                        <Image src={upload.path} alt={upload.fileName} width={200} height={200} className='aspect-auto w-50 rounded-lg'/>
                                    </div>
                                </td>
                                <th scope="row" className="pl-8 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                    {upload.fileName}
                                </th>
                                <td className="px-3 py-4">
                                    {dayjs(upload.createdAt).format('dddd [, ] D [ de ] MMMM [de] YYYY [as] h:mm A') }
                                </td>
                                <td className="px-3 py-4">
                                    <button 
                                        onClick={() => downloadImage(upload.path, upload.fileName)} 
                                        className='px-2 w-12 h-12 hover:bg-gray-50 hover:opacity-70 rounded-md'
                                    >
                                        <Download className='h-8 w-8'/>
                                    </button>
                                </td>
                                <td className="px-3 py-4">
                                    <button 
                                        onClick={() => deleteFile(upload.id)}
                                        className='px-2 w-12 h-12 hover:bg-gray-50 hover:opacity-70 rounded-md'
                                    >
                                        <XOctagon className='h-8 w-8' color='#cd0e0e' />
                                    </button>
                                </td>
                            </tr>
                        )
                    })}                    
                </tbody>
            </table>
        </div>
    )
}