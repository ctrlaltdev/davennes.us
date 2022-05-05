import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import ReactMarkdown from 'react-markdown'
import PageLayout from '../../layouts/Page/'
import Publications from '../../components/Publications/'

const PublicationsPage = () => {
  return (
    <PageLayout title='Publications'>
      <StaticQuery
        query={PublicationsQuery}
        render={data => (
          <div className='pub'>
            <div className='markdown-content'>
              <ReactMarkdown>{ data.contentfulPages?.content?.content }</ReactMarkdown>
            </div>
            <Publications items={data.allContentfulPublications.nodes} />
          </div>
        )}
      />
    </PageLayout>
  )
}

const PublicationsQuery = graphql`
{
  contentfulPages(page: {eq: "Publications"}) {
    content {
      content
    }
  }
  allContentfulPublications {
    nodes {
      id
      title
      subtitle
      type
      mainImage {
        gatsbyImageData(layout: FULL_WIDTH)
        title
        description
      }
      publicationDate(formatString: "YYYY")
      description {
        description
      }
    }
  }
}
`

export default PublicationsPage
