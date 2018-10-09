import { Context } from 'probot';

export class PullRequest {
  public context: Context;

  constructor(context: Context) {
    this.context = context;
  }

  public async addReviewers(
    owner: string,
    repo: string,
    prNumber: number,
    teamReviewers: string[]
  ): Promise<any> {
    const result = await this.context.github.pullRequests.createReviewRequest({
      number: prNumber,
      owner,
      repo,
      team_reviewers: teamReviewers,
    });

    return result;
  }

  public async addTeamLabel(owner: string, repo: string, prNumber: number): Promise<any> {
    const result = await this.context.github.pullRequests.createReviewRequest({
      number: prNumber,
      owner,
      repo,
    });

    return result;
  }
}
