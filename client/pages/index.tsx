import styles from '@assets/styles/Home.module.scss'
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
      <section className={styles.home}>
        <div className={styles.grid}>
          <div className={styles.gridItem1}> hi</div>
          <div className={styles.gridItem2}></div>
          <div className={styles.gridItem3}></div>
          <div className={styles.gridItem4}></div>
        </div>
      </section>
    </>
  )
}

{/* <Link href={'/chat'}><button className={styles.homeBtn} >chat</button></Link>
<Link href={'/image'}><button className={styles.homeBtn}>generation image</button></Link> */}
