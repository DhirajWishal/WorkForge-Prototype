var fileType = "ace/mode/c_cpp";
const FilePath = "ace/mode/";
var currentFile = null;
var currentTheme = null;

/**
 * 
 * @returns Editor data.
 */
function GetEditor() {
    var editor = ace.edit('editor');
    editor.setOption("showPrintMargin", false);
    return editor;
}

/**
 * Get data 
 * @returns The editor data.
 */
function GetEditorContent() {
    var editor = GetEditor();
    return editor.session.getValue();
}

/**
 * Reset the file type.
 * 
 * @param {*} type The file type.
 */
function ReRollFileType(type) {
    if (type == "cpp" || type == "cxx" || type == "h" || type == "hpp")
        fileType = FilePath + "c_cpp"
    else if (type == "js")
        fileType = FilePath + "javascript"
    else if (type == "cs")
        fileType = FilePath + "csharp"
    else if (type == "py")
        fileType = FilePath + "python"
}

/**
 * Refresh the editor so that the editor space can be set with a new theme and mode.
 * @returns The refreshed editor.
 */
function RefreshEditSpace() {
    var editor = GetEditor();
    var data = editor.session.getValue();
    editor.setTheme('ace/theme/monokai');
    editor.session.setMode(fileType);
    editor.session.setValue(data);
    return editor
}

/**
 * Submit content to the editor.
 * @param {*} data Submit content to the editor.
 */
function SubmitContent(data) {
    var editor = RefreshEditSpace();
    editor.setOption("showPrintMargin", false);
    editor.session.setValue(data);
}

/**
 * Change the editor theme.
 * @param {*} theme Change the theme of the editor.
 */
function ChangeTheme(theme) {
    var editor = GetEditor();
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

/**
 * Read file content.
 * @param {*} file The file to be read.
 * @param {*} callback The data callback.
 */
function ReadFile(file, callback) {
    fetch(file)
        .then(response => response.text())
        .then(data => callback(data))
        .catch(error => alert(error));
}

/**
 * Write data to a file.
 * @param {*} file The file to be written to.
 * @param {*} content The content to be written.
 */
function WriteFile(file, content) {
    const formData = new Blob([content], {
        type: "text/plain"
    });
    alert(file);

    fetch(file, {
            method: 'PUT',
            body: formData
        })
        .then(result => {
            console.log('Success:', result);
        })
        .catch(error => {
            console.error('Error:', error);
        });

    var response = new XMLHttpRequest();
}

function killCopy(e) {
    return false
}

function reEnable() {
    return true
}
document.onselectstart = function (...args) {
    return false;
}
if (window.sidebar) {
    document.onmousedown = killCopy
    document.onclick = reEnable
}

var testIfGet = String(document.location).replace("http://localhost:8080/Client/Editor/Editor.html?", "");
if (testIfGet.length) {
    currentFile = testIfGet;

    ReRollFileType(currentFile.split('.').pop());
    ReadFile("http://localhost:8080/" + currentFile, SubmitContent);
}
