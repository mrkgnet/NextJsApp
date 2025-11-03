import Link from 'next/link'
import React from 'react'

function UsersDetails({id,name}) {
  return (
    <div className='container mx-auto'>
        
        <ul className='items-center justify-center m-auto flex-col border-2 my-2 max-w-sm text-center'>
            <li>
                id:{id}
            </li>
           
            <li>
                <Link className='hover:text-red-500' href={`/users/${id}`}>  
                  name:{name}
                </Link>
              
            </li>
            
            <hr />
        </ul> 






        
    </div>
  )
}

export default UsersDetails