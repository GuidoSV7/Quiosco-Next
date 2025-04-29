import { create } from "zustand";
import type { OrderItem } from "./types";
import { Product } from "@prisma/client";

type Store = {
    order: OrderItem[]
    addToOrder: (product: Product) => void
    incrementQuantity: (id: number) => void
    decrementQuanty : (id: number) => void
    removeItem: (id: number) => void
    clearOrder: () => void

}

export const useStore = create<Store>((set, get) => ({

    order: [],
    addToOrder: (product) => {
        const {categoryId, image, ...data} = product

        let order:OrderItem[] = []
        const orders = get().order
            
        if(orders.find(item => item.id === product.id)){
            order = orders.map((item: OrderItem) => item.id === product.id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            } : item)
        }else{
           order = [...orders,{
                ...data,
                quantity: 1,
                subtotal: 1 * product.price
            }]
        }
        

        set((state) => ({
            order

        }) )
    },

    incrementQuantity: (id) => {
        const orders = get().order
        const order = orders.map((item: OrderItem) => item.id === id ? {
            ...item,
            quantity: item.quantity + 1,
            subtotal: item.price * (item.quantity + 1)
        } : item)

        set((state) => ({
            order
        }))
    },

    decrementQuanty: (id) => {
        const orders = get().order

        const order = orders.map(item => item.id === id ? {
            ...item,
            quantity: item.quantity -1,
            subtotal: item.price * (item.quantity - 1)


        }: item)


        set((state) => ({
            order
        }))

    },

    removeItem: (id) => {
        const orders = get().order
        const order = orders.filter(item => item.id !== id)
        set((state) => ({
            order
        }))
    },

    clearOrder: () => set(() => ({
        order: []
    }))

}))