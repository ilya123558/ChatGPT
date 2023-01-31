import Loading from '@components/ui/Loading/Loading';
import { useAppSelector } from '@hooks/redux';
import { useGetUserQuery } from '@services/UserService.api';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter()
  const loading = useAppSelector(state => state.state.loading)

  const { isLoading, error } = useGetUserQuery(null)

  useEffect(() => {
    if (error) {
      router.push('/auth/login')
    }
  }, [error])

  return (
    <>
      {(isLoading || loading) && <Loading />}
      <Link href={'/chat'}><button style={{ padding: '10px 15px', border: '1px solid #000', cursor: 'pointer', background: 'none', borderRadius: '5px' }}>chat</button></Link>
      <Link href={'/image'}><button style={{ padding: '10px 15px', border: '1px solid #000', margin: '0px 20px', cursor: 'pointer', background: 'none', borderRadius: '5px' }}>generation image</button></Link>
    </>
  )
}
