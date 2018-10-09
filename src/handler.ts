import { Context } from 'probot';
import { PullRequest } from './pull-request';
import { chooseTeam, includesSkipKeywords } from './util';

interface AppConfig {
  addReviewers: boolean;
  addTeamLabel: boolean;
  skipKeywords?: string[];
}

export async function handlePullRequest(context: Context): Promise<void> {
  let config: AppConfig | null;

  config = await context.config<AppConfig | null>('teams-config.yml');

  if (!config) {
    throw new Error('the configuration file failed to load');
  }

  const payload = context.payload;

  const prNumber = payload.number;
  const repo = payload.repository.name;
  const owner = payload.repository.owner.login;
  const orgTeams = payload.repository.owner.login.teams;
  const title = payload.pull_request.title;
  const prLabels = payload.pull_request.labels;
  const prAuthorTeams = payload.pull_request.user.teams;

  if (config.skipKeywords && includesSkipKeywords(title, prLabels, config.skipKeywords)) {
    context.log('skip request for review and labeling');
    return;
  }

  const reviewers = chooseTeam(prAuthorTeams, orgTeams);

  const pullRequest = new PullRequest(context);

  let result: Promise<any>;

  if (config.addReviewers) {
    result = await pullRequest.addReviewers(owner, repo, prNumber, reviewers);
    context.log(result);
  }
  if (config.addTeamLabel) {
    result = await pullRequest.addTeamLabel(owner, repo, prNumber);
    context.log(result);
  }
}
