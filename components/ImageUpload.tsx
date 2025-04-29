"use client"

import { getImagePath } from "@/src/utils"
import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image"
import { useState } from "react"
import { TbPhotoPlus } from "react-icons/tb"

export default function ImageUpload({image}: {image: string | undefined}) {
    const [imageUrl, setImageUrl] = useState(image || '')
    
    return (
        <div className="w-full">
            <CldUploadWidget
                onSuccess={(result, {widget}) => {
                    if(result.event === 'success') {
                        widget.close()
                        // @ts-ignore
                        setImageUrl(result.info?.secure_url)
                    }
                }}
                uploadPreset="ml_default"
                options={{
                    maxFiles: 1,
                }}
            >
                {({open}) => (
                    <>
                        <div className="w-full space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Subir Imagen
                            </label>
                            
                            {/* Área de upload */}
                            <div 
                                onClick={() => open()}
                                className="relative w-full min-h-[200px] cursor-pointer
                                    border-2 border-dashed border-gray-300 rounded-lg
                                    hover:border-gray-400 transition-colors
                                    flex flex-col justify-center items-center p-6
                                    bg-gray-50"
                            >
                                {!imageUrl ? (
                                    <>
                                        <TbPhotoPlus 
                                            size={50} 
                                            className="text-gray-400"
                                        />
                                        <div className="mt-4 text-sm text-gray-600">
                                            <span className="font-semibold">
                                                Click para subir
                                            </span> o arrastra y suelta
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2">
                                            PNG, JPG, GIF hasta 10MB
                                        </p>
                                    </>
                                ) : (
                                    <div className="relative w-full h-[200px]">
                                        <Image
                                            fill
                                            src={imageUrl}
                                            alt="Imagen subida"
                                            className="rounded-lg object-contain"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Vista previa de imagen actual si existe */}
                            {image && !imageUrl && (
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Imagen Actual
                                    </label>
                                    <div className="relative w-full h-[200px]">
                                        <Image
                                            fill
                                            src={getImagePath(image)}
                                            alt="Imagen actual"
                                            className="rounded-lg object-contain"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <input
                            type="hidden"
                            name="image"
                            value={imageUrl || image || ''}
                        />
                    </>
                )}
            </CldUploadWidget>
        </div>
    )
}