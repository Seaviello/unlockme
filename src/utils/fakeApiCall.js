export const fakeApiCall = ({ data, timeout = 500, error }) =>
  new Promise((resolve, reject) => {
    setTimeout(() => (error ? reject(error) : resolve(data)), timeout);
  });
