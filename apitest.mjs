import {Octokit} from "octokit";

const octokit = new Octokit({ auth: "" });

const target = {
  owner: "omine-me",
  repo: "QULib_AutoRenewMyBooks",
  branch: "main"
};

// (async () => {
//   const latestCommit = (await octokit.rest.repos.getBranch(target)).data.commit;
//   const files = (await octokit.rest.git.getTree({ ...target, tree_sha: latestCommit.sha })).data.tree;
//   const blob = (await octokit.rest.git.getBlob({ ...target, file_sha: files.find(file => file.path === ".gitignore")?.sha })).data;

//   console.log("===== Latest Commit =====");
//   console.log(latestCommit);

//   console.log("===== Root Files =====");
//   console.log(files);

//   console.log("===== First File =====");
//   console.log(Buffer.from(blob.content, "base64").toString("utf-8"));
// })();

(async () => {
  const latestCommit = (await octokit.rest.repos.getBranch(target)).data.commit;

  const createdBlob = (await octokit.rest.git.createBlob({
    ...target,
    content: Buffer.from("name: Test\n\non:\n   schedule:\n     - cron: '0 1 2 3 4'", "utf-8").toString("base64"),
    encoding: "base64"
  })).data;

  const createdTree = (await octokit.rest.git.createTree({
    ...target,
    tree: [{
      type: "blob",
      path: ".github/workflows/test1.yml",
      // path: "test_file.txt",
      mode: "100644",
      sha: createdBlob.sha
    }],
    base_tree: latestCommit.sha
  })).data;

  const createdCommit = (await octokit.rest.git.createCommit({
    ...target,
    message: "Update GitHub Actions Schedule",
    // message: "Update test_file.txt",
    tree: createdTree.sha,
    parents: [latestCommit.sha],
  })).data;

  await octokit.rest.git.updateRef({
    ...target,
    ref: `heads/${target.branch}`,
    sha: createdCommit.sha
  });
})().catch( function ( error ) {
  console.log( error );
} );;