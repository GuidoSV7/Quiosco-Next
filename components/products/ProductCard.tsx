import { formatCurrency, getImagePath } from "@/src/utils"
import { Product } from "@prisma/client"
import Image from "next/image"
import AddProductButton from "./AddProductButton"

type ProductCardProps = {
    product: Product
}


export default function ProductCard({product}:ProductCardProps) {

    const imagePath = getImagePath(product.image);
    console.log(imagePath)


  return (
    <div className="border bg-white">

        <Image
            src={imagePath}
            alt={product.name}
            width={400}
            height={500}
            quality={75}
            className="w-full h-auto object-cover"
    
        />

        
        <div className="p-5">
            <h3 className="text-2xl font-bold">{product.name}</h3>
            <p className="mt-5 font-black text-4xl text-amber-500 hover:translate-x-2 transition-transform duration-300">
                {formatCurrency(product.price)}
            </p>

            <AddProductButton
                product = {product}
            
            />

        </div>
    </div>
  )
}
