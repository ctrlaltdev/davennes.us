import React from 'react'
import { Link } from 'gatsby'
import ReactMarkdown from 'react-markdown'
import { GatsbyImage } from "gatsby-plugin-image";
import './publications.scss'

const Publications = ({ items }) => items.map(item => {
  return (
    <article className='pub__article' key={item.id}>
      <aside>
        <GatsbyImage
          image={item.mainImage.gatsbyImageData}
          className='pub__img'
          alt={`${ item.mainImage.title } - ${ item.mainImage.description }`} />
      </aside>
      <div className='pub__article-content'>
        <div className='pub__article-meta'><span><Link to={`/publications/${item.publicationDate}/`}>{ item.publicationDate }</Link></span> <span>{ item.type }</span></div>
        <h3>{ item.title }</h3>
        <p>{ item.subtitle }</p>
        <div className='markdown'>
          <ReactMarkdown>{ item.description.description }</ReactMarkdown>
        </div>
      </div>
    </article>
  )
})

export default Publications
