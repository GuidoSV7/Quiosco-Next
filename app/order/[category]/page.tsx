import ProductCard from "@/components/products/ProductCard"
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma"

async function getProducts(category: string) {
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category
      }
    }
  })
  return products
}

export default async function OrderPage({params}: {params: Promise<{category: string}>}) {

   // Extrae el parámetro dinámico (await porque params es una promesa)
   const { category } = await params;

  const products = await getProducts(category)
  return (
    <main>

      <Heading>
        Elige y personaliza tu pedido a continuación
      </Heading>

      <div className="grid grip-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 items-start">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    
    </main>
  )
}
