var currentFileElement = document.getElementById("FileTitle");
if (currentFileElement.innerHTML.length) {
    currentFile = currentFileElement.innerHTML;
    ReRollFileType(currentFile.split('.').pop());
    ReadFile(currentFile, SubmitContent);
}

// Load a file to the page.
document.getElementById("LoadFile").addEventListener("click", function () {
    var file = prompt("Enter file path.", "Test.js")
    if (file == "") {
        alert("The provided file path is invalid!")
        return;
    }
    else {
        ReRollFileType(file.split('.').pop());
        ReadFile(file, SubmitContent);

        currentFile = file;
        document.getElementById("FileTitle").innerHTML = currentFile;
    }
});

// Save the file.
document.getElementById("SaveFile").addEventListener("click", function () {
    WriteFile(currentFile, GetEditorContent());
});

// Save the file under a new name.
document.getElementById("SaveFileAs").addEventListener("click", function () {
    var file = prompt("Enter file path.")
    if (file == "")
        alert("The provided file path is invalid!")

    ReRollFileType(file.split('.').pop());
    RefreshEditSpace();
});

// Create a new file.
document.getElementById("CreateNew").addEventListener("click", function () {

});

// Setup the editor listener.
var editorDiv = document.getElementById("editor");
editorDiv.addEventListener("drop", function (ev) {
    alert("File dropped!");
});

//document.getElementById("SelectDarkTheme").addEventListener("click", function () { alert("dark"); });
//document.getElementById("SelectLightTheme").addEventListener("click", function () { alert("light"); });
//document.getElementById("SelectGitTheme").addEventListener("click", function () { alert("github"); });

var selector = document.getElementById("ThemeSelector");
selector.onchange = function () {
    ChangeTheme(selector.value);
}

document.getElementById("FileTitle").innerHTML = currentFile;
