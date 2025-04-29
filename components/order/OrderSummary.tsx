"use client"

import { useStore } from "@/src/store"
import ProductDetails from "./ProductDetails"
import { useMemo } from "react"
import { formatCurrency } from "@/src/utils"
import { createOrder } from "@/actions/create-order-action"
import { OrderSchema } from "@/src/schema"
import { toast } from "react-toastify"

export default function OrderSummary() {

  const order = useStore((state) => state.order)
  const total = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])
  const clearOrder = useStore((state) => state.clearOrder)


  const handleCreateOrder = async (formData: FormData) => {

    const data = {
      name: formData.get('name'),
      total,
      order
      
    }
    
    const result = OrderSchema.safeParse(data)

    console.log(result)

    if(!result.success){
      result.error.issues.forEach((issue) => {
        toast.error(issue.message)
      })

      return
    }

    

    const response = await createOrder(data)
    if(response?.errors){
      response.errors.forEach((error) => {
        toast.error(error)
      })
      
    }

    toast.success("Pedido realizado correctamente")
    clearOrder()
  }

  return (
    <aside className="lg:h-screen lg-overflow-y-scroll md:w-64 lg:w-96 p-5 ">
        <h1 className="text-4xl text-center font-black">Mi Pedido</h1>

        {order.length === 0 ? <p className="text-center my-10">No hay productos en tu pedido</p> : (
          <div className="">
             {order.map(item => (
                <ProductDetails
                    key={item.id}
                    item={item}
                />
             ))}

            <p className="text-2xl mt-20 text-center">

              Total a pagar: {''} 
              <span className="font-bold">{formatCurrency(total)}</span>
            </p>

            <form className="w-full mt-10 space-y-5"
              action={handleCreateOrder}
            >

              <input type="text" 
              name="name" 
              placeholder="Tu Nombre"
              className="bg-white w-full p-2 border border-gray-100  "
              />

              <input type="submit" 
                className="w-full bg-black text-white font-bold py-2 rounded uppercase text-center cursor-pointer"
                value="Confirmar Pedido"
              />


            </form>

          </div>
        )}

    </aside>
  )
}
