(function () {
  "use strict";

  function init() {
    var script = document.currentScript;
    if (!script) {
      // async scripts lose document.currentScript; find the last matching script tag
      var scripts = document.querySelectorAll('script[src*="embed.js"]');
      script = scripts[scripts.length - 1];
    }
    if (!script) return;

    var clientId = script.getAttribute("data-client-id");
    if (!clientId) {
      console.error("[TellTheOwner] Missing data-client-id on embed script.");
      return;
    }

    var targetId = script.getAttribute("data-target");
    var mountTarget = targetId ? document.getElementById(targetId) : null;

    // Avoid double-injecting if the script runs more than once
    if (mountTarget && mountTarget.querySelector(".telltheowner-embed")) return;
    if (!mountTarget && script.nextElementSibling &&
        script.nextElementSibling.classList &&
        script.nextElementSibling.classList.contains("telltheowner-embed")) {
      return;
    }

    var baseUrl = script.getAttribute("data-base-url");
    if (!baseUrl) {
      baseUrl = script.src.replace(/\/embed\.js(\?.*)?$/, "");
    }

    var wrapper = document.createElement("div");
    wrapper.className = "telltheowner-embed";
    wrapper.style.cssText =
      "display:flex;justify-content:center;width:100%;margin:16px 0;box-sizing:border-box;";

    var iframe = document.createElement("iframe");
    iframe.src =
      baseUrl + "/b/" + encodeURIComponent(clientId) + "/embed";
    iframe.width = "320";
    iframe.height = "216";
    iframe.title = "Leave a voice review";
    iframe.setAttribute("allow", "microphone");
    iframe.setAttribute("loading", "lazy");
    iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    iframe.style.cssText =
      "width:320px;height:216px;max-width:100%;border:0;display:block;";

    wrapper.appendChild(iframe);

    if (mountTarget) {
      mountTarget.appendChild(wrapper);
      return;
    }

    if (targetId) {
      console.warn(
        "[TellTheOwner] Target element #" + targetId + " not found. Inserting after script."
      );
    }

    script.parentNode.insertBefore(wrapper, script.nextSibling);
  }

  // Defer until after the host page has hydrated (important for React/Next.js sites)
  if (document.readyState === "complete") {
    setTimeout(init, 0);
  } else {
    window.addEventListener("load", function () {
      setTimeout(init, 0);
    });
  }
})();
