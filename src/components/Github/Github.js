import OctoKit from '@octokit/rest'

const getGithubClient = async () => {
  const client = await new OctoKit({
    auth: process.env.REACT_APP_GITHUB_ACCESS_TOKEN
  })

  return client
}

const getUserInfo = async client => {
  return client.activity.listEventsForUser({
    username: process.env.REACT_APP_GITHUB_USERNAME
  })
}

export { getGithubClient, getUserInfo }
