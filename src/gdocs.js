// Client ID and API key from the Developer Console
import gAPICredentials from "./gAPICredentials.json";
const { CLIENT_ID, API_KEY } = gAPICredentials;

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = ["documents", "userinfo.email", "userinfo.profile"].map(
  (scope) => `https://www.googleapis.com/auth/${scope}`
).join(" ");

let initClientResolve, initClientReject;
export const initClientPromise = new Promise((resolve, reject) => {
  initClientResolve = resolve;
  initClientReject = reject;
});
initClientPromise.catch(console.error);

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

/**
 *  On load, called to load the Google Identity Services library and the
 *  API client library.
 */
function handleClientLoad() {
  // The GIS client script must be loaded as a classic script: it is not
  // compatible with ES module imports.
  return loadScript("https://accounts.google.com/gsi/client").then(initClient);
}

let tokenClient,
  accessToken,
  pendingConnect,
  apiClientPromise,
  apiClientReady = false;

/**
 *  Sets up the token client (new Google Identity Services flow replacing
 *  gapi.auth2) and starts the API client initialization in the background.
 */
function initClient() {
  try {
    // New: token client for the implicit flow replaces gapi.auth2. It does
    // not depend on the gapi client module, so sign-in can start right
    // away. It returns an access token used for the Docs API and the
    // userinfo request.
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: handleTokenResponse,
      error_callback: handleTokenError,
    });
  } catch (error) {
    initClientReject(error);
    return;
  }

  // The new library has no sign-in state listener (unlike gapi.auth2), so
  // the app starts signed out. Emit the initial status so that the UI can
  // leave its loading state and show the Sign in button.
  updateConnectionStatus(false);

  initClientResolve();

  // gapi.client is still used to make API requests, but the deprecated
  // gapi.auth2 module is no longer loaded: the access token is obtained
  // from the Google Identity Services token client and set with
  // gapi.client.setToken(). Loading/initializing the client module runs in
  // the background; if it is slow or fails, sign-in still works and the
  // document requests fall back to direct fetch calls.
  apiClientPromise = initApiClient()
    .then(() => {
      apiClientReady = true;
    })
    .catch((error) => {
      console.warn("API client unavailable, using direct API requests", error);
    });
}

/**
 *  Loads the gapi client module and initializes it (discovery doc + API
 *  key). Resolves as soon as gapi.client is usable.
 */
function initApiClient() {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error("gapi client module load timed out")),
      15000
    );
    gapi.load("client", () => {
      clearTimeout(timer);
      if (typeof gapi.client.init !== "function") {
        reject(new Error("gapi.client is not available"));
        return;
      }
      gapi.client
        .init({
          apiKey: API_KEY,
          discoveryDocs: [
            "https://docs.googleapis.com/$discovery/rest?version=v1",
          ],
        })
        .then(resolve, reject);
    });
  });
}

function setClientToken(token) {
  // gapi.client may not be available if its module never finished loading;
  // the fetch fallback uses the access token directly in that case.
  try {
    gapi.client.setToken(token);
  } catch (error) {
    console.warn("gapi.client.setToken unavailable", error);
  }
}

function handleTokenResponse(tokenResponse) {
  accessToken = tokenResponse.access_token;
  setClientToken({ access_token: accessToken });
  // If the API client is still initializing, apply the token again once it
  // is ready so that the document requests made right after sign-in are
  // not rejected.
  apiClientPromise?.catch(() => {}).then(() => {
    if (accessToken) setClientToken({ access_token: accessToken });
  });
  updateConnectionStatus(true);
  if (pendingConnect) {
    pendingConnect.resolve(tokenResponse);
    pendingConnect = null;
  }
}

function handleTokenError(tokenErrorResponse) {
  console.error(tokenErrorResponse);
  if (pendingConnect) {
    pendingConnect.reject(
      new Error(
        tokenErrorResponse.error_description || tokenErrorResponse.error
      )
    );
    pendingConnect = null;
  }
}

let connectStatusPromise,
  connectStatus,
  resolveConnectStatus = Function.prototype;
function updateConnectionStatus(isConnected) {
  console.log("status", isConnected);
  connectStatus = isConnected;
  connectStatusPromise = new Promise((resolve) => {
    resolveConnectStatus(isConnected);
    resolveConnectStatus = resolve;
  });
}
updateConnectionStatus(undefined); // Initialize connection status
export async function* subscribeToConnectionStatus() {
  if (connectStatus !== undefined) yield connectStatus;
  while (true) {
    const status = await connectStatusPromise;
    yield status;
  }
}

/**
 *  Sign in the user upon button click.
 *  Resolves when the user grants access, rejects if the flow is cancelled
 *  or fails.
 */
export function connect() {
  return new Promise((resolve, reject) => {
    pendingConnect = { resolve, reject };
    // Request the access token (authorization). This opens the Google
    // sign-in/consent popup and returns an access token used for the Docs
    // API and the userinfo request.
    tokenClient.requestAccessToken();
  });
}

/**
 *  Sign out the user upon button click.
 *  The new library does not manage the app's session state, so this only
 *  clears the local token (the user keeps their Google session and won't
 *  be asked for consent again on next sign-in).
 */
export function disconnect() {
  setClientToken(null);
  accessToken = null;
  updateConnectionStatus(false);
  return Promise.resolve();
}

/**
 *  Profile of the signed-in user, fetched from the userinfo endpoint using
 *  the OAuth access token (the token client does not return an ID token).
 *  Always uses a plain fetch (no API key) so that the API key's API
 *  restrictions do not block the OpenID Connect API.
 */
export function getUserInfo() {
  return fetchApi("/oauth2/v3/userinfo"); // Changed v2 to v3
}

import "https://apis.google.com/js/api.js";
handleClientLoad().catch(initClientReject);

// Fallback for when the gapi client module is unavailable: call the Google
// APIs directly with the OAuth access token.
async function fetchApi(path, options = {}) {
  const response = await fetch(`https://www.googleapis.com${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const result = await response.json();
  if (!response.ok) {
    const error = new Error(result.error?.message || response.statusText);
    error.result = { error: { code: response.status, message: error.message } };
    throw error;
  }
  return { result };
}

const documentsApi = {
  get: (params) =>
    apiClientAvailable() ? gapi.client.docs.documents.get(params) : fetchApi(`/v1/documents/${params.documentId}`),
  batchUpdate: (params) =>
    apiClientAvailable()
      ? gapi.client.docs.documents.batchUpdate(params)
      : fetchApi(`/v1/documents/${params.documentId}:batchUpdate`, {
          method: "POST",
          body: JSON.stringify(params.requests),
        }),
};
function apiClientAvailable() {
  return (
    apiClientReady && typeof gapi.client?.docs?.documents?.get === "function"
  );
}
export { documentsApi };
