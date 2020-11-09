import React from 'react'
import PageLayout from '../../layouts/Page/'
import './contact.sass'

const Contact = () => {
  const sendMessage = e => {
    e.preventDefault()
    const form = e.target
    console.info({
      from: `${form.name.value} <${form.email.value}>`,
      subject: form.subject.value,
      body: `From: ${form.name.value}\n---\n${form.body.value}`
    })
  }

  return (
    <PageLayout title='Contact'>
      <div className='contact'>
        <form onSubmit={ sendMessage }>
          <fieldset>
            <input disabled className='contact__name' name='name' type='text' required placeholder='Name' />
          </fieldset>
          <fieldset>
            <input disabled className='contact__email' name='email' type='email' required placeholder='your@email.com' />
          </fieldset>
          <fieldset>
            <input disabled className='contact__subject' name='subject' type='text' required placeholder='Subject' />
          </fieldset>
          <fieldset>
            <textarea disabled className='contact__body' name='body' required />
          </fieldset>
          <fieldset>
            <input className='contact__tel' type='tel' name='tel' tabindex={-1} />
          </fieldset>
          <fieldset>
            <input disabled className='contact__send' type='submit' value='Send' />
          </fieldset>
        </form>
      </div>
    </PageLayout>
  )
}

export default Contact
