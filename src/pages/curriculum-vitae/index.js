import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

const renderEducation = items => items.map(item => {
  return (
    <article key={item.id}>
      <span>{item.year}</span>
      <h3>{ item.diploma }</h3>
      <p>{ item.school } - { item.location }</p>
    </article>
  )
})

const renderPublications = items => items.map(item => {
  return (
    <article key={item.id}>
      <span>{item.publicationDate}</span>
      <h3>{ item.title }</h3>
      <p>{ item.subtitle }</p>
    </article>
  )
})

const renderAwards = items => items.map(item => {
  return (
    <article key={item.id}>
      <span>{ item.startYear ? `${item.startYear} - ` : '' }{item.endYear}</span>
      <h3>{ item.title }</h3>
  <p>{ item.entity }{ item.sum ? `- $${item.sum}` : '' }</p>
    </article>
  )
})

const renderTeaching = items => items.map(item => {
  return (
    <article key={item.id}>
      <span>{ item.endSemester } - { item.endYear }</span>
      <h3>{ item.class } ({ item.capacity === 'Teaching Assistant' ? 'TA' : item.capacity })</h3>
      <p>{ item.subtitle }</p>
    </article>
  )
})

const renderConference = (title, items) => (
  <>
    <h3>{ title }</h3>
    { items.map(item => {
      return (
        <article key={item.id}>
          <span>{ item.date }</span>
          <h3>{ item.title }</h3>
          <p>{ item.location }</p>
        </article>
      )
    }) }
  </>
)

const renderResponsabilities = items => items.map(item => {
  return (
    <article key={item.id}>
      <span>{ item.startDate } - { item.endDate }</span>
      <h3>{ item.title }</h3>
      <p>{ item.organization }</p>
      <p>{ item.description.description }</p>
    </article>
  )
})

const renderEmployment = items => items.map(item => {
  return (
    <article key={item.id}>
      <span>{ item.startDate } - { item.endDate }</span>
      <h3>{ item.position }</h3>
      <p>{ item.employer } - { item.location }</p>
    </article>
  )
})

const renderVolunteering = items => items.map(item => {
  return (
    <article key={item.id}>
      <span>{ item.startDate } - { item.endDate }</span>
      <h3>{ item.title }</h3>
      <p>{ item.description.description }</p>
    </article>
  )
})

const renderAffiliations = items => <ul>{ items.map(item => <li key={item.id}>{ item.name }</li>) }</ul>

const renderInterests = items => <ul>{ items.map(item => <li key={item}>{item}</li>) }</ul>

const renderLanguages = items => <ul>{ items.map(item => <li key={item}>{item}</li>) }</ul>

export default function CV() {
  return (
    <StaticQuery
      query={CVQuery}
      render={data => (
        <>
          <header>
            <h1>{data.contentfulCurriculumVitae.position}</h1>
          </header>
          <section>
            <h2>Education</h2>
            { renderEducation(data.contentfulCurriculumVitae.education) }
          </section>
          <section>
            <h2>Publications</h2>
            { renderPublications(data.contentfulCurriculumVitae.publications) }
          </section>
          <section>
            <h2>Fellowships &amp; Awards</h2>
            { renderAwards(data.contentfulCurriculumVitae.awards) }
          </section>
          <section>
            <h2>Teaching Experience</h2>
            { renderTeaching(data.contentfulCurriculumVitae.teaching) }
          </section>
          <section>
            <h2>Conference &amp; Presentations</h2>
            { renderConference('Conference Presentation', data.contentfulCurriculumVitae.conferencePresentations) }
            { renderConference('Conference Organization', data.contentfulCurriculumVitae.conferenceOrganization) }
            { renderConference('Invited Talks', data.contentfulCurriculumVitae.invitedTalks) }
          </section>
          <section>
            <h2>Responsabilities &amp; University Service</h2>
            { renderResponsabilities(data.contentfulCurriculumVitae.responsabilities) }
          </section>
          <section>
            <h2>Employment</h2>
            { renderEmployment(data.contentfulCurriculumVitae.employment) }
          </section>
          <section>
            <h2>Community Involvement</h2>
            { renderVolunteering(data.contentfulCurriculumVitae.communityInvolvement) }
          </section>
          <section>
            <h2>Professional Affiliations</h2>
            { renderAffiliations(data.contentfulCurriculumVitae.affiliations) }
          </section>
          <section>
            <h2>Fields of Interest</h2>
            { renderInterests(data.contentfulCurriculumVitae.interests) }
          </section>
          <section>
            <h2>Languages</h2>
            { renderLanguages(data.contentfulCurriculumVitae.languages) }
          </section>
        </>
      )}
    />
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
      publicationDate
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
      date
    }
    conferenceOrganization {
      id
      title
      description {
        description
      }
      location
      date
    }
    invitedTalks {
      id
      title
      description {
        description
      }
      location
      date
    }
    responsabilities {
      id
      title
      organization
      description {
        description
      }
      startDate
      endDate
    }
    employment {
      id
      position
      employer
      location
      startDate
      endDate
    }
    communityInvolvement {
      id
      title
      description {
        description
      }
      startDate
      endDate
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
