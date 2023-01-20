import { useGetUserQuery } from '@services/UserService.api'
import { useRouter } from 'next/router';

import Main from '@components/Main/Main'
import Meta from '@utils/meta/Meta'
import { useEffect } from 'react';


export default function Home() {

  const router = useRouter();
  const { data, isLoading, error } = useGetUserQuery(null)

  useEffect(() => {
    if (!data && !isLoading) {
      router.push('/auth/login')
    }

    if(error) {
      router.push('/auth/login')
    }

  }, [data, isLoading, error])

  return (
    <>
      <Meta title='Chat' description='chat' />
      {
        isLoading
          ?
          <div>loading...</div>
          :
          <Main />
      }
    </>
  )
}
