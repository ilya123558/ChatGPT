import CreateImageBg from '@components/ui/CreateImageBg/CreateImageBg';
import styles from '@assets/styles/CreateImage.module.scss'
import React from 'react';
import CreateImageContent from '@components/CreateImageContent/CreateImageContent';

const CreateImagePage: React.FC = () => {

    return (
        <section className={styles.wrapper}>
            <CreateImageBg />
            <CreateImageContent />
        </section>
    );
};

export default CreateImagePage;