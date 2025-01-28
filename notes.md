# Notes for Archive-Lens

## HTML

A quick reference to HTML tags

The page is semantically divided into two parts. The head, which contains metadata and references to other files:
```html
<!DOCTYPE html>
<html>

<head>
    <!-- Nothing in the header actuallly shows up -->
    <title>Title of webpage</title>
</head>
```
and the body, which contain a header, a main, and a footer.
```html
<body>
    <!-- Visible title and navigation sections -->
    <header>
        <h1></h1>
        <nav>
            <div></div>
        </nav>
    </header>
    <!-- Content -->
    <main>
        <!-- section tag is semantic -->
        <section> 
            <h2>Smaller heading than h1</h2>
            <p>
                <b>bold paragraph text</b>
            </p>
        </section>
        ...
    </main>
    <footer>
    </footer>
</body>
</html>
```

A header contains your big fat logo and navigation.
The body contains a lot more of the juicy stuff. The most basic are text elements like paragraphs and headers and lists:
```html
<section>
    <h2></h2>
    <ol>
        <li></li>
        ...
    </ol>
</section>
...
<aside>
    <img src="example.com">
    <p>Aside paragraph</p>
</aside>
```

Things get a lot more interesting when you add media:

```html
<img src="example.com/photo.png">
<video src="video.mp4" controls autoplay=true>
<audio src="joemama.mpeg" controls>

or forms:
```html
<form action="submission.html" method="post">
    <label for="ta">TextArea: </label>
    <textarea id="ta" name="ta-id">
        Some text
    </textarea>
    <button type="submit">Submit</button>
</form>
```
