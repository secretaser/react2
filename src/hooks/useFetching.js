import { useState } from "react"

export const useFetching = (callback) => {
   const [isLoading, setIsLoading] = useState(true) // могут быть проблемесы из-за тру
   const [error, setError] = useState('')

   const fetching = async (...args) => {
      try {
         setIsLoading(true)
         await callback(...args)
      } catch (e) {
         setError(e.message)
      } finally {
         setIsLoading(false)
      }
   }
   return [fetching, isLoading, error]
}