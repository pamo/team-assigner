export function chooseTeam(userTeams: string[], orgTeams: string[]): string[] {
  const assignedTeams = [];
  for (const userTeam of userTeams) {
    if (orgTeams.includes(userTeam)) {
      assignedTeams.push(userTeam);
    }
  }
  return assignedTeams;
}

export function includesSkipKeywords(
  title: string,
  labels: string[],
  skipKeywords: string[]
): boolean {
  labels.map(label => (label = label.toLowerCase()));
  for (const skipKeyword of skipKeywords) {
    if (title.toLowerCase().includes(skipKeyword.toLowerCase()) === true) {
      return true;
    }
    if (labels.includes(skipKeyword.toLowerCase())) {
      return true;
    }
  }

  return false;
}
