
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import 'https://apis.google.com/js/api.js';

// Client ID and API key from the Developer Console
var CLIENT_ID =
  "574901819149-d46caor3hasi3bsngfua2q20idump433.apps.googleusercontent.com";
var API_KEY = "AIzaSyDIzIuLKqaQhWXSykVOWOQLqlLggFTDOh8";

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://docs.googleapis.com/$discovery/rest?version=v1"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = ["/auth/documents", "/auth/userinfo.email"]
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
  while (!("client" in gapi)) await new Promise((d) => setTimeout(d, 0));

  console.log("client available");
  await gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES,
  });
  console.log("client initialized");
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
async function* subscribeToConnectionStatus() {
  console.log("subscribe", connectStatus);
  if (connectStatus !== undefined) yield connectStatus;
  console.log("yield?", connectStatus);
  while (true) {
    console.log("await before", connectStatus);
    const status = await connectStatusPromise;
    console.log("await after", connectStatus);
    yield status;
  }
}

/**
 *  Sign in the user upon button click.
 */
function connect() {
  console.log("connect");
  return gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function disconnect() {
  console.log("disconnect");
  return gapi.auth2.getAuthInstance().signOut();
}
handleClientLoad();

export { connect, disconnect, subscribeToConnectionStatus };
//# sourceMappingURL=gdocs-3e2fabe6.js.map
