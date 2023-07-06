import axios from 'axios'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useGlobalContext } from './context'

const url = `https://api.unsplash.com/search/photos/?client_id=${
  import.meta.env.VITE_ACCESS_KEY
}`

const Gallery = () => {
  const { searchValue } = useGlobalContext()

  const response = useQuery({
    queryKey: ['photos', searchValue],
    queryFn: async () => {
      const result = await axios.get(`${url}&query=${searchValue}`)
      return result.data
    },
  })

  if (response.isLoading) {
    return (
      <section className="image-container">
        <h4>Loading...</h4>
      </section>
    )
  }

  if (response.error) {
    return (
      <section className="image-container">
        <h4>There was an error...</h4>
      </section>
    )
  }

  const results = response.data.results

  if (results.length < 1) {
    return (
      <section className="image-container">
        <h4>No results found...</h4>
      </section>
    )
  }

  return (
    <section className="image-container">
      {results.map((photo) => {
        const { id, urls } = photo
        return (
          <img
            key={id}
            src={urls.small}
            alt={photo.alt_description}
            className="img"
          />
        )
      })}
    </section>
  )
}

export default Gallery
