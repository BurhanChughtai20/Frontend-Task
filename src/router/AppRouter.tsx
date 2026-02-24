import React, { Suspense } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { routes } from "../config/routes.config"

const router = createBrowserRouter(
  routes.map(({ path, element, layout }) => ({
    path,
    element: layout ? React.createElement(layout, { children: element }) : element,
  }))
)

export default function AppRouter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  )
}