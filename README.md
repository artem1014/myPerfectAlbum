Hi there! Here's the test task named MyPerfectAlbum.

## Getting Started

First, run the development server:

```bash
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## More

What do we have here:

- The user is able to sort all photos by Date or by ID. By default the photos are sorted by ID in ASC.
- Also the user is able to add new photo to the album by pushing on "Add new photo to the album button. After the adding photo to the album the array sorts in ASC by ID.
- Photos removing logic is realised on the photo card. Just press "DELETE" button.
- The user can filter photos by id by typing id in the field "FILTER BY PHOTO ID".
- Every card has its own page - just push on the photo. To get back - push the "Back to main page" button in header.
- Array or photos will not rerender (reset) even if you reload the page. It will happen only if you change code in backend.

Json for the test was got from [JSONPlaceholder](https://jsonplaceholder.typicode.com/) and modified by me (i've added random createDate to every photo).

Firstly i wanted to make requests to API, but then i must having Database, so i decided just to hardcode all the data to JSON.

That's it. Thank you!

