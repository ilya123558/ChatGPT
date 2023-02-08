import styles from '@assets/styles/Home.module.scss'
import Header from '@components/ui/Header/Header';
import Loading from '@components/ui/Loading/Loading';
import { useAppSelector } from '@hooks/redux';
import { useGetUserQuery } from '@services/UserService.api';
import Meta from '@utils/meta/Meta';
import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const loading = useAppSelector(state => state.state.loading)
    const { isLoading, error } = useGetUserQuery(null)

    return (
        <>
            {(isLoading || loading) && <Loading />}
            <Meta title='Rezis' description='home chat generate image' />
            <section className={styles.home}>
                <div className={styles.wrapper}>
                    <Header auth={!error} />
                    {children}
                </div>
            </section>
        </>
    )
};

export default Layout;