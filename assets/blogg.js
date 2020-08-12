const strBlogDir = 'blogs/';
var blogs = [];
var blogsTemplate;

window.onload = function() {
    var tmplSrc = document.getElementById("id-blogs-template").innerHTML;
    blogsTemplate = Handlebars.compile(tmplSrc);
    renderBlogs();
    fetchBlogs();
}

function fetchBlogs() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', strBlogDir + 'blogs.json' + '?ts=' + new Date().toString(), true);
    xhr.addEventListener('load', function(event) {
        var blogFileNames = JSON.parse(xhr.responseText);
        blogFileNames.forEach(function(strBlogFileName) {
            fetchBlog(strBlogFileName);
        });
    });
    xhr.send();
}

function fetchBlog(strBlogFileName) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', strBlogDir + strBlogFileName + '?ts=' + new Date().toString(), true);
    xhr.addEventListener('load', function(event) {
        var blog = JSON.parse(xhr.responseText);
        blogs.push(blog);
        renderBlogs();
    });
    xhr.send();
}

function renderBlogs() {
    var html = blogsTemplate({ blogs: blogs });
    document.getElementById("id-blogs").innerHTML = html;
}