// Client ID and API key from the Developer Console
import gAPICredentials from "./gAPICredentials.json";
const { CLIENT_ID, API_KEY } = gAPICredentials;

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = ["/auth/documents", "/auth/userinfo.email"]
  .map((scope) => `https://www.googleapis.com${scope}`)
  .join(" ");

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  return gapi.load("client:auth2", initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
async function initClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: ["https://docs.googleapis.com/$discovery/rest?version=v1"],
    scope: SCOPES,
  });
  // Listen for sign-in state changes.
  gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

  // Handle the initial sign-in state.
  updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
}

let connectStatusPromise,
  connectStatus,
  resolveConnectStatus = Function.prototype;
function updateSigninStatus(isSignedIn) {
  console.log("status", isSignedIn);
  connectStatus = isSignedIn;
  connectStatusPromise = new Promise((resolve) => {
    resolveConnectStatus(isSignedIn);
    resolveConnectStatus = resolve;
  });
}
updateSigninStatus(undefined); // Initialize connection status
export async function* subscribeToConnectionStatus() {
  if (connectStatus !== undefined) yield connectStatus;
  while (true) {
    const status = await connectStatusPromise;
    yield status;
  }
}

/**
 *  Sign in the user upon button click.
 */
export function connect() {
  return gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
export function disconnect() {
  return gapi.auth2.getAuthInstance().signOut();
}

import "https://apis.google.com/js/api.js";
handleClientLoad();
