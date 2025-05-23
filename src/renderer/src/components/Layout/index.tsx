import { Outlet } from 'react-router-dom'
import { Header } from '../Header'
import * as Collapsible from '@radix-ui/react-collapsible'
import { Sidebar } from '../Sidebar'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    function handleNavigate() {
      navigate('/create')
    }

    const unsub = window.api.onNewCustomer(handleNavigate)

    return () => {
      unsub()
    }
  }, [])

  return (
    <Collapsible.Root
      defaultOpen
      className="h-screen w-screen text-slate-100 flex overflow-hidden"
      onOpenChange={setIsSidebarOpen}
    >
      <Sidebar />
      <div className="flex-1 flex flex-col max-h-screen">
        <Header isSidebarOpen={isSidebarOpen} />
        <Outlet />
      </div>
    </Collapsible.Root>
  )
}
