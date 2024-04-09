import './App.css'
import { AppProvider } from './providers/app.provider'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { HomePage } from './pages/HomePage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  }
])

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  )
}

export default App
