import Head from "next/head";

interface IProps {
    description?: string,
    title: string
}

const Meta: React.FC<IProps> = ({ title, description }) => {
    return (
        <Head>
            <title>{title}</title>
            {description
                ?
                <meta name="description" itemProp="description" content={description} />
                :
                <meta name="robots" content={"noindex, nofollow"} />
            }
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
};

export default Meta;