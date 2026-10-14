/*
  COPYRIGHT FOOTER + LIGHT IMAGE PROTECTION
  =========================================
  Loaded on every page.

  1. Fills the copyright line in the footer (the current year updates itself).
  2. Blocks "right-click > Save image as" and dragging photos out of the page.

  This only stops casual saving. Anyone determined can still take a screenshot
  or use their browser's developer tools - a watermark in the exported JPEG
  itself is the only protection that travels with the file.
*/

(function () {
  // >>> EDIT THIS: the name that appears in the copyright line <<<
  const SITE_OWNER = "Denise Malan";

  const year = new Date().getFullYear();
  document.querySelectorAll("[data-copyright]").forEach(function (el) {
    el.textContent =
      "\u00A9 " + year + " " + SITE_OWNER +
      ". All photographs are copyrighted and may not be copied or reused without permission.";
  });

  function isImage(target) {
    return target && target.tagName === "IMG";
  }

  // Event delegation on the document, so it also covers images added later
  // (filtered grids, the enlarged lightbox photo, etc.).
  document.addEventListener("contextmenu", function (e) {
    if (isImage(e.target)) e.preventDefault();
  });
  document.addEventListener("dragstart", function (e) {
    if (isImage(e.target)) e.preventDefault();
  });
})();
