# HttpService
For this class, Axios has been provided. Feel free to use window.fetch too if you prefer.

The base URL has been provided to you (#baseUrl).  All other urls should build from it
- ex. if your endpoint was /hello_world, you would use `const storyUrl = this.#baseUrl + '/hello_world'` 

There are two endpoints:
- /story
- /user_stories
  -  The /user_stories endpoint is optional
  -  It is here if you want more practice

For these two endpoints, 
/story accepts GET, PUT, POST, and DELETE requests
/user_stories accepts GET requests

## Endpoints:

### The `/story` Endpoint

#### GET /story
When this url sent a request, it will retreive, or READ, a list of all stories currently stored in the database
- The data shape is left up to the reader to discover _smirk_

#### GET /story/$storyId
An optional parameter of storyId can be passed in.  If the user knows the id of a story, they can hit this endpoint to retrieve a specific story.
    - When the database is in its pristine state, there will be only one story in the db.  And its id is `test-story-id`.  You can use this to begin testing out
how to build out this handler. (don't include the $ symbol)

#### POST /story
To CREATE a new story in the database, a post request can be sent to the /story url.
- The body of the request should be as follows:

```
{
  "story_title": "the title of your story",
  "story_content": "your actual story. it should have a beginning, a middle, and end. maybe some plot. try to write a few dozen words. or pages.  it's up to you and your creativity. maybe this is the moment you discover that software isn't for you, and you were born to be a writer."
}
```
- To ensure the story is attributed to the correct author, this endpoint and method requires an authorization header.
    - For simplicity's sake, the authorization header value is just "username password".  
    - There is a test user seeded to the database.  You can use this test user for this method.
        - username: `test-user`
        - password: `test`
        
#### PUT /story/$storyId
To UPDATE an existing story in the database, a put request can be sent to the /story endpoint.
- The body of the request should be the same at POST /story
- An authorization header is also required for this endpoint, same as POST.
- Again, when providinig the `storyId` don't include the `$`

#### DELETE /story/$storyId
To DELETE an existing story in the database, a DELETE request can be sent to the /story/$storyId endpoint.
- There is no body for this endpoint
- An authorization header is required

### The `/user_stories/$username` Endpoint
This is an optional endpoint that you can implement if you'd like more practice.  Again, it is not expected that you implement this endpoint.  It's only here for additional practice if you want it.
- This endpoint will return all the stories stored in the database for the username provided.
- Only the GET method is available for this endpoint
- A reminder: when passing in the username, don't include the `$` symbol
