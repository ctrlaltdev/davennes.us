import React, { useState } from 'react'
import fetch from 'isomorphic-unfetch'
import PageLayout from '../../layouts/Page/'
import './contact.sass'

const Contact = () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [subject, setSubject] = useState()
  const [tel, setTel] = useState()
  const [body, setBody] = useState()
  const [submit, setSubmit] = useState('Send')
  const [sent, setSent] = useState(false)

  const sendMessage = e => {
    e.preventDefault()
    const msg = {
      name,
      email,
      subject,
      body
    }

    setSent(true)

    if (tel) {
      setSubmit('Sent')
      return
    }

    fetch('https://sqs.us-west-1.amazonaws.com/277596378320/0x766f6964-aurelien-3da740f5a1239b04babd899f76928985?' + new URLSearchParams({
        Action: 'SendMessage',
        MessageBody: JSON.stringify(msg)
      }))
      .then(r => r.text())
      .then(() => {
        setSubmit('Sent')
      })
      .catch(e => {
        console.error(e)
        setSubmit('Error')
      })
  }

  return (
    <PageLayout title='Contact'>
      <div className='contact'>
        <form onSubmit={ sendMessage }>
          <fieldset>
            <input className='contact__name' name='name' type='text' required placeholder='Name' disabled={ sent } onChange={e => setName(e.value)} value={ name } />
          </fieldset>
          <fieldset>
            <input className='contact__email' name='email' type='email' required placeholder='your@email.com' disabled={ sent } onChange={e => setEmail(e.value)} value={ email } />
          </fieldset>
          <fieldset>
            <input className='contact__subject' name='subject' type='text' required placeholder='Subject' disabled={ sent } onChange={e => setSubject(e.value)} value={ subject } />
          </fieldset>
          <fieldset>
            <textarea className='contact__body' name='body' required disabled={ sent } onChange={e => setBody(e.value)} value={ body } />
          </fieldset>
          <fieldset>
            <input className='contact__tel' type='tel' name='tel' disabled={ sent } onChange={e => setTel(e.value)} value={ tel } tabIndex={-1} />
          </fieldset>
          <fieldset>
            <input className='contact__send' type='submit' disabled={ sent } value={ submit } />
          </fieldset>
        </form>
      </div>
    </PageLayout>
  )
}

export default Contact
