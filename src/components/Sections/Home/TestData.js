const testData = () => {
  return {
    created_at: '2019-08-08T23:55:29Z',
    id: '10177675080',
    payload: {
      before: '1f46291e39811688fd0e0d3d87378bcbfcac23b2',
      ref: 'refs/heads/latest-commit-modal',
      commits: [
        {
          author: { email: 'jnavarr56@gmail.com', name: 'Jorge Navarro' },
          distinct: true,
          message: 'Added push and create events to github modal.',
          sha: 'ed6eec825f13b3e7f6850b6750eca8893a49ea1e'
        },
        {
          author: { email: 'jnavarr56@gmail.com', name: 'Jorge Navarro' },
          distinct: true,
          message: 'Added push and create events to github modal.',
          sha: 'ed6eec825f13b3e7f6850b6750eca8893a49ea1e'
        },
        {
          author: { email: 'jnavarr56@gmail.com', name: 'Jorge Navarro' },
          distinct: true,
          message: 'Added push and create events to github modal.',
          sha: 'ed6eec825f13b3e7f6850b6750eca8893a49ea1e'
        }
      ]
    },
    public: true,
    repo: {
      id: 200539551,
      name: 'Jnavarr56/react-personal-site',
      url: 'https://api.github.com/repos/Jnavarr56/react-personal-site'
    },
    type: 'PushEvent'
  }
}

export default testData
