import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Repo from '../components/Repo'
import { doUserRepos } from '../actions/doUserRepos'

class UserRepos extends Component {
  componentDidMount() {
    const username = 'pasechnik'
    this.props.doUserRepos(username)
  }

  render() {
    const { repos } = this.props
    let pageContent = ''

    if (this.props.loading) {
      pageContent = (
        <div className='userReposLoader'>
          Loading...
        </div>
      )
    } else {
      pageContent = (
        <ul className='repos'>
          {repos.map(repo => <Repo key={repo.id} {...repo} />)}
        </ul>
      )
    }

    return (
      <div>
        <h3>Github Projects</h3>
        {pageContent}
      </div>
    )
  }
}

UserRepos.propTypes = {
  loading: PropTypes.bool.isRequired,
  doUserRepos: PropTypes.func.isRequired,
  repos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    html_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    archive_url: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
    assignees_url: PropTypes.string.isRequired,
    blobs_url: PropTypes.string.isRequired,
    branches_url: PropTypes.string.isRequired,
    clone_url: PropTypes.string.isRequired,
    collaborators_url: PropTypes.string.isRequired,
    comments_url: PropTypes.string.isRequired,
    commits_url: PropTypes.string.isRequired,
    compare_url: PropTypes.string.isRequired,
    contents_url: PropTypes.string.isRequired,
    contributors_url: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    default_branch: PropTypes.string.isRequired,
    deployments_url: PropTypes.string.isRequired,
    description: PropTypes.string,
    downloads_url: PropTypes.string.isRequired,
    events_url: PropTypes.string.isRequired,
    fork: PropTypes.bool.isRequired,
    forks: PropTypes.number.isRequired,
    forks_count: PropTypes.number.isRequired,
    forks_url: PropTypes.string.isRequired,
    full_name: PropTypes.string.isRequired,
    git_commits_url: PropTypes.string.isRequired,
    git_refs_url: PropTypes.string.isRequired,
    git_tags_url: PropTypes.string.isRequired,
    git_url: PropTypes.string.isRequired,
    has_downloads: PropTypes.bool.isRequired,
    has_issues: PropTypes.bool.isRequired,
    has_pages: PropTypes.bool.isRequired,
    has_projects: PropTypes.bool.isRequired,
    has_wiki: PropTypes.bool.isRequired,
    homepage: PropTypes.string,
    hooks_url: PropTypes.string.isRequired,
    issue_comment_url: PropTypes.string.isRequired,
    issue_events_url: PropTypes.string.isRequired,
    issues_url: PropTypes.string.isRequired,
    keys_url: PropTypes.string.isRequired,
    labels_url: PropTypes.string.isRequired,
    language: PropTypes.string,
    languages_url: PropTypes.string.isRequired,
    license: PropTypes.object,
    merges_url: PropTypes.string.isRequired,
    milestones_url: PropTypes.string.isRequired,
    mirror_url: PropTypes.string,
    notifications_url: PropTypes.string.isRequired,
    open_issues: PropTypes.number.isRequired,
    open_issues_count: PropTypes.number.isRequired,
    owner: PropTypes.shape({
      login: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      avatar_url: PropTypes.string.isRequired,
      gravatar_id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
    private: PropTypes.bool.isRequired,
    pulls_url: PropTypes.string.isRequired,
    pushed_at: PropTypes.string.isRequired,
    releases_url: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    ssh_url: PropTypes.string.isRequired,
    stargazers_count: PropTypes.number.isRequired,
    stargazers_url: PropTypes.string.isRequired,
    statuses_url: PropTypes.string.isRequired,
    subscribers_url: PropTypes.string.isRequired,
    subscription_url: PropTypes.string.isRequired,
    svn_url: PropTypes.string.isRequired,
    tags_url: PropTypes.string.isRequired,
    teams_url: PropTypes.string.isRequired,
    trees_url: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    watchers: PropTypes.number.isRequired,
    watchers_count: PropTypes.number.isRequired,
  })).isRequired,
}

const mapStateToProps = state => ({
  repos: state.home.userRepos.repos,
  loading: state.home.userRepos.isLoading,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  doUserRepos,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserRepos)
