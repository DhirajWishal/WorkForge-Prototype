var fileType = "ace/mode/c_cpp";
const FilePath = "ace/mode/";
var currentFile = null;

// Reset the file type.
function ReRollFileType(type) {
    if (type == "cpp" || type == "cxx" || type == "h" || type == "hpp")
        fileType = FilePath + "c_cpp"
    else if (type == "js")
        fileType = FilePath + "javascript"
    else if (type == "cs")
        fileType = FilePath + "csharp"
}

// Refresh the editor so that the editor space can be set with a new theme and mode.
function RefreshEditSpace() {
    var editor = ace.edit('editor');
    var data = editor.session.getValue();
    editor.setTheme('ace/theme/monokai');
    editor.session.setMode(fileType);
    editor.session.setValue(data);
    return editor
}

// Submit content to the editor.
function SubmitContent(data) {
    var editor = RefreshEditSpace();
    editor.session.setValue(data);
}

// Change the editor theme.
function ChangeTheme(theme) {
    var editor = ace.edit('editor');
    var data = editor.session.getValue();

    if (theme == "dark")
        editor.setTheme('ace/theme/monokai');
    else if (theme == "light")
        editor.setTheme('ace/theme/chrome');
    else if (theme == "github")
        editor.setTheme('ace/theme/github');

    editor.session.setMode(fileType);
    editor.session.setValue(data);
}

// Read file content.
function ReadFile(file, callback) {
    //"E:/Flint/Source/VulkanBackend/Source/VulkanDevice.cpp"
    fetch(file)
        .then(response => response.text())
        .then(data => callback(data))
        .catch(error => alert(error));
}

function WriteFile(file, content) {
    var data = new Blob([content], { type: "js" });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(data);
    a.download = file;
}

function killCopy(e) {
    return false
}
function reEnable() {
    return true
}
document.onselectstart = function (...args) { return false; }
if (window.sidebar) {
    document.onmousedown = killCopy
    document.onclick = reEnable
}