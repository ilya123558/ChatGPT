import styles from '@assets/styles/Home.module.scss'
import Header from '@components/ui/Header/Header';
import HomeMain from '@components/ui/MainContent/MainContent';
import Loading from '@components/ui/Loading/Loading';
import { useAppSelector } from '@hooks/redux';
import { useGetUserQuery } from '@services/UserService.api';
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
      <section className={styles.home}>
        <div className={styles.wrapper}>
          <Header />
          <HomeMain />
        </div>
      </section>

    </>
  )
}

