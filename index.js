// const core = require('@actions/core');
// const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
//   const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello World!`);
  const time = (new Date()).toTimeString();
  console.log(time);
//   core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
//   const payload = JSON.stringify(github.context.payload, undefined, 2)
//   console.log(`The event payload: ${payload}`);
// } catch (error) {
//   core.setFailed(error.message);
}
