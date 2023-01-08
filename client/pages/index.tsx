import Sidebar from '@components/Sidebar/Sidebar'
import AddChatBtn from '@components/ui/AddChatBtn/AddChatBtn'
import Meta from '@utils/meta/Meta'

export default function Home() {
  return (
    <>
      <Meta title='Chat' description='chat'/>
      <Sidebar/>
    </>
  )
}
