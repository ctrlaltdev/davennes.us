import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import ReactMarkdown from 'react-markdown'
import PageLayout from '../../layouts/Page/'
import './publications.sass'

const renderPublications = items => items.map(item => {
  return (
    <article className='pub__article' key={item.id}>
      <aside>
        <img className='pub__img' alt={`${ item.mainImage.title } - ${ item.mainImage.description }`} src={ item.mainImage.fluid.src } />
      </aside>
      <div className='pub__article-content'>
        <span>{ item.publicationDate } - { item.type }</span>
        <h3>{ item.title }</h3>
        <p>{ item.subtitle }</p>
        <div className='markdown'>
          <ReactMarkdown>{ item.description.description }</ReactMarkdown>
        </div>
      </div>
    </article>
  )
})

const Publications = () => {
  return (
    <PageLayout title='Publications'>
      <StaticQuery
        query={PublicationsQuery}
        render={data => (
          <div className='pub'>
            <div className='markdown-content'>
              <ReactMarkdown>{ data.contentfulPages?.content?.content }</ReactMarkdown>
            </div>
            { renderPublications(data.allContentfulPublications.nodes) }
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
        fluid(maxWidth: 1200 quality: 100) {
          src
        }
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

export default Publications
