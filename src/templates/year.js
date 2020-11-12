import React from 'react'
import PageLayout from '../layouts/Page/'
import Publications from '../components/Publications/'

const Year = ({ pageContext: ctx }) => {
  return (
    <PageLayout title={`Publications > ${ctx.year}`}>
      <div className='pub'>
        <Publications items={ctx.pubs} />
      </div>
    </PageLayout>
  )
}

export default Year
