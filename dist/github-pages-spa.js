(function restoreGitHubPagesRoute(location, history) {
  if (!location.search || location.search.charAt(1) !== "/") return;

  var restoredPath = location.search
    .slice(1)
    .split("&")
    .map(function decodeSegment(segment) {
      return segment.replace(/~and~/g, "&");
    })
    .join("?");

  history.replaceState(null, "", location.pathname.slice(0, -1) + restoredPath + location.hash);
})(window.location, window.history);
