import EditProductForm from "@/components/products/EditProductForm"
import ProductForm from "@/components/products/ProductForm"
import GoBackButton from "@/components/ui/GoBackButton"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import { notFound } from "next/navigation"

// Properly typing the params object for Next.js
type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

async function getProductById(id: number) {
  const product = await prisma.product.findUnique({
    where: {
      id
    }
  })
  
  if (!product) {
    notFound()
  }
  
  return product
}

export default async function EditProductsPage({ params }: Props) {
  const product = await getProductById(+params.id)
  
  return (
    <>
      <Heading>Editar Producto: {product.name}</Heading>
      
      <GoBackButton />
      
      <EditProductForm>
        <ProductForm
          product={product}
        />
      </EditProductForm>
    </>
  )
}