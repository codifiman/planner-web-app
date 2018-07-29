const makeUrl = (resource) => `http://localhost:3000${resource}`;

const readStream = (reader, characters=[]) => ({ done, value }) => {
  if (!done) {
    characters.push(...value);
    return reader.read().then(readStream(reader, characters));
  }

  const body = characters.reduce((b, c) => b + String.fromCharCode(c), '');

  return JSON.parse(body);
};

export const get = (resource, accountId) => {
  const headers = new Headers();

  if (accountId) { headers.set('accountId', accountId); };

  return fetch(makeUrl(resource), {
    headers,
    method:      'GET',
    mode:        'cors',
    // credentials: 'include',
  })

  .then((response) => {
    const { ok } = response;
    const bodyReader = response.body.getReader();

    return bodyReader.read().then(readStream(bodyReader))
    .then((body) => ({ body, ok }))
  });
};

// POST and process response data
export const post = (resource, data) => fetch(makeUrl(resource), {
  method:      'POST',
  mode:        'cors',
  cache:       'no-cache',
  // credentials: 'include',
  headers:     {
    'Content-Type': 'application/json; charset=utf-8',
  },
  body: JSON.stringify(data),
})

.then((response) => {
  const { ok } = response;
  const bodyReader = response.body.getReader();

  return bodyReader.read().then(readStream(bodyReader))
  .then((body) => ({ body, ok }))

});
