import React from 'react'
import TableCard from 'components/Claim';

const Single = ({columns}) => {
  return (
    <>
         
            <div className="px-3 md:px-8 h-auto">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 px-4 mb-16">
                        <TableCard columns={columns} />
                    </div>
                </div>
            </div>
        </>
  )
}

export default Single


