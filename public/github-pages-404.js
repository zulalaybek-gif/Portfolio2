(function redirectGitHubPagesRoute(location) {
  var path = location.pathname.replace(/^\/+/, "");
  var query = location.search ? location.search.slice(1).replace(/&/g, "~and~") : "";
  var target = location.origin + "/?/" + path + (query ? "&" + query : "") + location.hash;

  location.replace(target);
})(window.location);
