import { useRouter } from 'next/router';
import React from 'react';

const Userid = ({ user }) => {
    const router = useRouter();
    const { userid } = router.query;
    if (router.isFallback) { return <div className='container mx-auto my-10'>لطفا منتظر بمانید </div> }
    if (!user) { return <div>User not found</div> }
    return (
        <div className="container border-2 my-4 max-w-sm text-center mx-auto p-4">
            <p>User ID: {user.id}</p>
            <p>User Name: {user.name}</p>
        </div>
    );
};

export default Userid;

export async function getStaticProps(context) {
    const { userid } = context.params;
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userid}`);
    const data = await res.json();

    // اگر کاربر وجود نداشت یا داده خالی بود => ریدایرکت
    if (res.status === 404 || !data.id) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: {
            user: data,
        },
    };
}

export async function getStaticPaths() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await res.json();

    const paths = users.map((user) => ({
        params: { userid: user.id.toString() },
    }));

    return {
        paths: paths,
        fallback: true,
    };
}
