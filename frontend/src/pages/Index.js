import { Form, Link, useLoaderData } from "react-router-dom"

function Index(props) {
  const entries = useLoaderData()

  return (
    <div>
      <h2>Create a entry</h2>
      <Form action="/create" method="post">
        <input type="input" name="date" placeholder="entry date" />
        <input type="input" name="category" placeholder="entry category" />
        <input type="input" name="description" placeholder="entry description" />
        <input type="submit" value="create entry" />
      </Form>

      <h2>Entries</h2>
      {entries.map(entry => (
        <div key={entry._id} className="entry">
          <Link to={`/${entry._id}`}>
            <h1>{entry.name}</h1>
          </Link>
          <img src={entry.image} alt={entry.name} />
          <h3>{entry.title}</h3>
        </div>
      ))}
    </div>
  )
}

export default Index
