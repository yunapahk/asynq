// the url for our backend server
import { baseURL } from "./base_url";
// function allows use to redirect to other routes
import { redirect } from "react-router-dom";

export const createAction = async ({ request }) => {
  try {
    // get data from form
    const formData = await request.formData()
    // match schema from backend
    const newEntry = {
      date: formData.get("date"),
      category: formData.get("category"),
      description: formData.get("description"),
    }
    // send the new entry to our backend API
    await fetch(`${ baseURL }/entries`, {
      // tell fetch to make a post request
      method: 'POST',
      headers: {
        // tells our backend the data is JSON
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newEntry),
    })
    // redirect to index
    return redirect("/")
  } catch (error) {
    console.error("Error creating entry... Fix me!");
    // Handle the error as appropriate for your application
  }
}

export const updateAction = async ({ request, params }) => {
  try {
    // grab the id from the params
    const id = params.id;
    // grab the data from the form
    const formData = await request.formData();
    // build out the updated entry
    const updatedEntry = {
      date: formData.get('date'),
      category: formData.get('category'),
      description: formData.get('description'),
    }
    // send the updated entry to our backend API
    await fetch(`${ baseURL }/entries/${id}`, {
      // tell fetch to make a put request
      method: 'PUT',
      // tell backend the data is JSON
      headers: {
        "Content-Type": "application/json"
      },
      // send the json string of the updatedEntry object
      body: JSON.stringify(updatedEntry)
    })
    // redirect back to index frontend route
    return redirect("/")
  } catch (error) {
    console.error("Error updating entry... Fix me!");
    // Handle the error as appropriate for your application
  }
}

export const deleteAction = async ({params}) => {
  try {
    // grab the id from the params
    const id = params.id
    // send a delete request to our backend API
    await fetch(`${ baseURL }/entries/${id}`, {
      // tell fetch to make a delete request
      method: 'DELETE'
      // no headers or body required for delete requests
    })
    // redirect back to the frontend index route
    return redirect('/')
  } catch (error) {
    console.error("Error deleting entry... Fix me!");
    // Handle the error as appropriate for your application
  }
}
