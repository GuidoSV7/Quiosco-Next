import ProductsTable from '@/components/products/ProductsTable';
import Heading from '../../../components/ui/Heading';
import { prisma } from '@/src/lib/prisma';
import ProductsPagination from '@/components/products/ProductsPagination';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import ProductSearchForm from '@/components/products/ProductSearchForm';


async function productCount() {
  return await prisma.product.count()
}



async function getProducts(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize
    const products = await prisma.product.findMany({
      take: pageSize,
      include: {
        category: true
      }
    })
    return products
}
//hola
export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>

export default async function ProductsPage({params} : {params: Promise<{page: string}>}) {

  const {page} =  await params;
  const pageNumber = +page
  
  const pageSize = 10


  if(pageNumber < 0) redirect(`/admin/products`)

  const productsData = getProducts(pageNumber, pageSize)
  const totalProductsData = productCount()

  const [products, totalProducts] = await Promise.all([productsData, totalProductsData])
  const totalPages = Math.ceil(totalProducts / pageSize)

  if(pageNumber > totalPages) redirect(`/admin/products`)




  return (
    

    <>
      <Heading>
        Administrar Productos

      </Heading>

      <div className='flex flex-col lg:flex-row lg:justify-between gap-5'>
        <Link
          href={"/admin/products/new"}
          className='bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer'
          
        >Crear Producto</Link>

        <ProductSearchForm/>


      </div>

      <ProductsTable 
      products={products} 
      
      />

      <ProductsPagination 
      page={pageNumber}
      totalPages={totalPages}
      
      />
      

    </>
    
  )
}
