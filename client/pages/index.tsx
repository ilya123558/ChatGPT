import { useGetUserQuery } from '@services/UserService.api'
import { useRouter } from 'next/router';

import Main from '@components/Main/Main'
import Meta from '@utils/meta/Meta'
import { useEffect } from 'react';
import Loading from '@components/ui/Loading/Loading';
import { useAppSelector } from '@hooks/redux';


export default function Home() {

  const loading = useAppSelector(state => state.state.loading)

  const router = useRouter();
  const { isLoading, error } = useGetUserQuery(null)

  useEffect(() => {
    if (error) {
      router.push('/auth/login')
    }

  }, [error])

  return (
    <>
      <Meta title='Chat' description='chat' />
      {
        isLoading
          ?
          <Loading />
          :
          <>
            {loading && <Loading />}
            <Main />
          </>
      }
    </>
  )
}
