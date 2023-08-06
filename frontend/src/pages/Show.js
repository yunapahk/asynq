import { useLoaderData, Form } from "react-router-dom";

function Show(props) {
  const entry = useLoaderData();
  console.log(entry);

  return (
    <div className="entry">
      <h2>{entry.date}</h2>
      <h2>{entry.category}</h2>
      <h2>{entry.description}</h2>

    <h2>Update {entry.name}</h2>
    <Form action={`/update/${entry._id}`} method="post">
        <input type="text" name="date" placeholder="entry date" defaultValue={entry.date}/>
        <input type="text" name="category" placeholder="entry category" defaultValue={entry.category}/>
        <input type="text" name="description" placeholder="entry description" defaultValue={entry.description}/>
        <input type="submit" value="Update Entry"/>
    </Form>

    <h2>Delete Entry</h2>
      <Form action={`/delete/${entry._id}`} method="post">
        <input type="submit" value="Delete Entry"/>
      </Form>
    </div>
  );
}

export default Show;