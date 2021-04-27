import React from 'react'
import PageLayout from '../../layouts/Page/'
import { StaticQuery, graphql } from 'gatsby'
import ReactMarkdown from 'react-markdown'
import './cv.sass'

const renderEducation = items => items.map(item => {
  return (
    <article className='cv__article' key={item.id}>
      <aside>
        <span>{item.year}</span>
      </aside>
      <div className='cv__article-content'>
        <h3>{ item.diploma }</h3>
        <p>{ item.school } - { item.location }</p>
      </div>
    </article>
  )
})

const renderPublications = items => items.map(item => {
  return (
    <article className='cv__article' key={item.id}>
      <aside>
        <span>{item.publicationDate}</span>
      </aside>
      <div className='cv__article-content'>
        <h3>{ item.title }</h3>
        <p>{ item.subtitle }</p>
        <div className='markdown'>
          <ReactMarkdown>{ item.description.description }</ReactMarkdown>
        </div>
      </div>
    </article>
  )
})

const renderAwards = items => items.map(item => {
  return (
    <article className='cv__article' key={item.id}>
      <aside>
        <span>{ item.startYear ? `${item.startYear} - ` : '' }{item.endYear}</span>
      </aside>
      <div className='cv__article-content'>
        <h3>{ item.title }</h3>
        <p>{ item.entity }{ item.sum ? ` - $${item.sum}` : '' }</p>
      </div>
    </article>
  )
})

const renderTeaching = items => items.map(item => {
  return (
    <article className='cv__article' key={item.id}>
      <aside>
        <span>{ item.endSemester } { item.endYear }</span>
      </aside>
      <div className='cv__article-content'>
        <h3>{ item.class } ({ item.capacity === 'Teaching Assistant' ? 'TA' : item.capacity })</h3>
        <p>{ item.subtitle }</p>
      </div>
    </article>
  )
})

const renderConference = (title, items) => (
  <>
    <h3 className='cv__section-title'>{ title }</h3>
    { items.map(item => {
      return (
        <article className='cv__article' key={item.id}>
          <aside>
            <span>{ item.date }</span>
          </aside>
          <div className='cv__article-content'>
            <h3>{ item.title }</h3>
            <p>{ item.location }</p>
          </div>
        </article>
      )
    }) }
  </>
)

const renderResponsabilities = items => items.map(item => {
  return (
    <article className='cv__article' key={item.id}>
      <aside>
        <span>{ item.startDate } - { item.endDate }</span>
      </aside>
      <div className='cv__article-content'>
        <h3>{ item.title }</h3>
        <p>{ item.organization }</p>
        <div className='markdown'>
          <ReactMarkdown>{ item.description.description }</ReactMarkdown>
        </div>
      </div>
    </article>
  )
})

const renderEmployment = items => items.map(item => {
  return (
    <article className='cv__article' key={item.id}>
      <aside>
        <span>{ item.startDate } - { item.endDate }</span>
      </aside>
      <div className='cv__article-content'>
        <h3>{ item.position }</h3>
        <p>{ item.employer } - { item.location }</p>
      </div>
    </article>
  )
})

const renderVolunteering = items => items.map(item => {
  return (
    <article className='cv__article' key={item.id}>
      <aside>
        <span>{ item.startDate ? `${item.startDate} - ` : '' }{ item.endDate }</span>
      </aside>
      <div className='cv__article-content'>
        <h3>{ item.title }</h3>
        <p>{ item.description.description }</p>
      </div>
    </article>
  )
})

const renderAffiliations = items => <ul className='cv__list cv__affiliations'>{ items.map(item => <li key={item.id}>{ item.name }</li>) }</ul>

const renderInterests = items => <ul className='cv__list cv__interests'>{ items.map(item => <li key={item}>{item}</li>) }</ul>

const renderLanguages = items => <ul className='cv__list cv__langs'>{ items.map(item => <li key={item}>{item}</li>) }</ul>

const CV = () => {
  console.info(CVQuery)
  return (
    <PageLayout title='Curriculum Vitae'>
      <StaticQuery
        query={CVQuery}
        render={data => (
          <div className='cv'>
            <header>
              <h1 className='cv__title'>Aurélien Davennes<br />{data.contentfulCurriculumVitae.position}</h1>
            </header>
            <section className='cv__section'>
              <h2>Education</h2>
              { renderEducation(data.contentfulCurriculumVitae.education) }
            </section>
            <section className='cv__section'>
              <h2>Publications</h2>
              { renderPublications(data.contentfulCurriculumVitae.publications) }
            </section>
            <section className='cv__section'>
              <h2>Fellowships &amp; Awards</h2>
              { renderAwards(data.contentfulCurriculumVitae.awards) }
            </section>
            <section className='cv__section'>
              <h2>Teaching Experience</h2>
              { renderTeaching(data.contentfulCurriculumVitae.teaching) }
            </section>
            <section className='cv__section'>
              <h2>Conference &amp; Presentations</h2>
              { renderConference('Conference Presentation', data.contentfulCurriculumVitae.conferencePresentations) }
              { renderConference('Conference Organization', data.contentfulCurriculumVitae.conferenceOrganization) }
              { renderConference('Invited Talks', data.contentfulCurriculumVitae.invitedTalks) }
            </section>
            <section className='cv__section'>
              <h2>Responsabilities &amp; University Service</h2>
              { renderResponsabilities(data.contentfulCurriculumVitae.responsabilities) }
            </section>
            <section className='cv__section'>
              <h2>Employment</h2>
              { renderEmployment(data.contentfulCurriculumVitae.employment) }
            </section>
            <section className='cv__section'>
              <h2>Community Involvement</h2>
              { renderVolunteering(data.contentfulCurriculumVitae.communityInvolvement) }
            </section>
            <section className='cv__section'>
              <h2>Professional Affiliations</h2>
              { renderAffiliations(data.contentfulCurriculumVitae.affiliations) }
            </section>
            <section className='cv__section'>
              <h2>Fields of Interest</h2>
              { renderInterests(data.contentfulCurriculumVitae.interests) }
            </section>
            <section className='cv__section'>
              <h2>Languages</h2>
              { renderLanguages(data.contentfulCurriculumVitae.languages) }
            </section>
          </div>
        )}
      />
    </PageLayout>
  )
}

const CVQuery = graphql`
{
  contentfulCurriculumVitae {
    position
    education {
      id
      diploma
      school
      location
      year
    }
    publications {
      id
      title
      type
      subtitle
      description {
        description
      }
      publicationDate(formatString: "YYYY")
    }
    awards {
      id
      title
      entity
      sum
      startYear
      endYear
    }
    teaching {
      id
      class
      subtitle
      # description {
      #   description
      # }
      capacity
      # startSemester
      # startYear
      endSemester
      endYear
    }
    conferencePresentations {
      id
      title
      description {
        description
      }
      location
      date (formatString: "MMM YYYY")
    }
    conferenceOrganization {
      id
      title
      description {
        description
      }
      location
      date (formatString: "MMM YYYY")
    }
    invitedTalks {
      id
      title
      description {
        description
      }
      location
      date (formatString: "MMM YYYY")
    }
    responsabilities {
      id
      title
      organization
      description {
        description
      }
      startDate (formatString: "YYYY")
      endDate (formatString: "YYYY")
    }
    employment {
      id
      position
      employer
      location
      startDate (formatString: "YYYY")
      endDate (formatString: "YYYY")
    }
    communityInvolvement {
      id
      title
      description {
        description
      }
      startDate (formatString: "YYYY")
      endDate (formatString: "YYYY")
    }
    affiliations {
      id
      name
    }
    interests
    languages
  }
}
`

export default CV
