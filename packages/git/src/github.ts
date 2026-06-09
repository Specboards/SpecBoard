import type { GitRepoClient, SpecFile, WriteFileInput } from "./index.js";

export interface GitHubRepoConfig {
  installationId: string;
  owner: string;
  name: string;
  ref: string;
}

/**
 * GitHub App-backed {@link GitRepoClient}. SCAFFOLD: methods are stubbed.
 * Implementation plan:
 *  - authenticate as the GitHub App installation (octokit + app auth)
 *  - listSpecFiles: git tree walk filtered by globs
 *  - readFile: contents API (or blob API for large files)
 *  - writeFile: "direct" -> contents API commit; "pr" -> create branch,
 *    commit, open PR via pulls API
 */
export class GitHubRepoClient implements GitRepoClient {
  constructor(private readonly config: GitHubRepoConfig) {}

  listSpecFiles(_globs: string[]): Promise<SpecFile[]> {
    throw new Error("GitHubRepoClient.listSpecFiles not implemented (scaffold)");
  }

  readFile(_path: string): Promise<SpecFile> {
    throw new Error("GitHubRepoClient.readFile not implemented (scaffold)");
  }

  writeFile(_input: WriteFileInput): Promise<{ commitSha: string }> {
    throw new Error("GitHubRepoClient.writeFile not implemented (scaffold)");
  }
}
