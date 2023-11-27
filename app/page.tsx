import Header from '@/components/Header'
import Months from '@/components/Months'
import SideBar from '@/components/SideBar'
import { Divider } from '@nextui-org/react'

export default function Home() {
  return (
    <main className="flex h-screen w-screen justify-between overflow-hidden bg-background p-2 text-foreground">
      <SideBar />
      <Divider orientation="vertical" />
      <div className="flex flex-grow flex-col">
        <Header />
        <Divider className="mt-2" />
        <Months />
      </div>
    </main>
  )
}
