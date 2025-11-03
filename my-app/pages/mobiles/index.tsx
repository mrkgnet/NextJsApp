import Mobilecard from '@/components/mobilecard/mobilecard';
import React from 'react';

const Index = ({ data }) => {
    console.log(data);
    return (
        <div className='container mx-auto my-4'>
           
            <div className='flex flex-wrap gap-4 '>
                {
                data.map((item) => (
                    <Mobilecard key={item.id} {...item} />

                ))
                }
            </div>

        </div>
    );
}

export default Index;

export async function getServerSideProps() {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    return {
        props: {
            data
        }
    }
}