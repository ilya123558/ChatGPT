import CreateImageBg from '@components/ui/CreateImageBg/CreateImageBg';
import styles from '@assets/styles/CreateImage.module.scss'
import React from 'react';
import CreateImageContent from '@components/CreateImageContent/CreateImageContent';
import Meta from '@utils/meta/Meta';

const CreateImagePage: React.FC = () => {

    return (
        <>
        <Meta title='Image Generation'/>
            <section className={styles.wrapper}>
                <CreateImageBg />
                <CreateImageContent />
            </section>
        </>

    );
};

export default CreateImagePage;