import CreateImageBg from '@components/ui/CreateImageBg/CreateImageBg';
import styles from '@assets/styles/CreateImage.module.scss'
import React, { useEffect } from 'react';
import CreateImageContent from '@components/CreateImageContent/CreateImageContent';
import Meta from '@utils/meta/Meta';
import BackHomeBtnCreateImagePage from '@components/ui/buttons/BackHomeBtnCreateImagePage/BackHomeBtnCreateImagePage';
import { useGetUserQuery } from '@services/UserService.api';
import { useRouter } from 'next/router';
import Loading from '@components/ui/Loading/Loading';
import { useAppSelector } from '@hooks/redux';

const CreateImagePage: React.FC = () => {

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
            <Meta title='Image Generation' />
            <section className={styles.wrapper}>
                <CreateImageBg />
                <CreateImageContent />
                <BackHomeBtnCreateImagePage />
            </section>
        </>

    );
};

export default CreateImagePage;