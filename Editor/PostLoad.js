// Set no copy, paste, cut, drag, and drop feature.
$("body").bind('copy paste cut drag drop', function (e) {
    e.preventDefault();
});