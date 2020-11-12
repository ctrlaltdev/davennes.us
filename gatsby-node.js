const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
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
  `)

  const years = {}
  const pubs = result.data.allContentfulPublications.nodes

  for (let i = 0; i < pubs.length; i++) {
    const pub = pubs[i]
    if (!years[pub.publicationDate]) {
      years[pub.publicationDate] = []
    }

    years[pub.publicationDate].push(pub)
  }

  for (const year in years) {
    createPage({
      path: `/publications/${year}`,
      component: path.resolve(`./src/templates/year.js`),
      context: {
        year,
        pubs: years[year],
      },
    })
  }
}
