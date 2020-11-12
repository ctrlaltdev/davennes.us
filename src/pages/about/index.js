import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import PageLayout from '../../layouts/Page/'
import ReactMarkdown from 'react-markdown'
import './about.sass'

const AboutPage = () => {
  return (
    <PageLayout title='About Me'>
      <StaticQuery
        query={AboutQuery}
        render={data => (
          <div className='about'>
            <div className='markdown-content'>
              <ReactMarkdown>{ data.contentfulPages?.content?.content }</ReactMarkdown>
            </div>
          </div>
        )}
      />
      
    </PageLayout>
  )
}

const AboutQuery = graphql`
{
  contentfulPages(page: {eq: "About"}) {
    content {
      content
    }
  }
}
`

export default AboutPage
