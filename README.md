# Archive Lens
## Pitch
Just like me, you probably have a box of old letters and journals from your great grandpa, and you really don't want to throw it away but you don't know what to do with it? Store, view, and organize your family history memories in one place: Archive Lens. Users can easily upload documents such as journal pages or letters, then add metadata such as author(s), dates, and tags to easily find your documents later. Share your documents with other users, or even give them permission to contribute metadata or comments. 
## Design

The main page will look a bit like this:
<img src="readme-images/mainpage_design.png">

And document quick view will display a small overlay using React that looks something like this:
<img src="readme-images/quickview_design.png" height=500>

And viewing a document will go to a new page with more information and a document viewer that probably looks a little like this:
<img src="readme-images/readerview_design.png">

## Key Features
* Easily review and read uploaded documents
* Quickly find documents by author(s), date, or tag
* Filter permissions so that other users can (or can't) view, comment, or contribute
* Chat with other users to collaborate about a document or document author
* Disocver what was happening in history on the same day a memory a journal entry or letter was written
## Technologies
Archive Lens will use the following technologies:
* **HTML:** An HTML page for logging in, an HTML page for viewing all your documents, and an HTML page for viewing a single documents and its metadata and comments.
* **CSS:** Organizes documents by grid or list view, chops up the page into sections so that a document is displayed on one side and information about it is displayed on the other.
* **JavaScript:** Search for documents by metadata
* **React:** Online viewer of documents, quick view document information, filter document list by search.
* **Service:** Backend endpoints for
  * Logging in
  * Retrieving documents and metadata
  * Searching for documents
  * Sharing documents and/or editing permissions
  * Adding comments or changes to a document
* **DB:** Stores account information, documents and metadata
* **WebSockets:** Provides real-time chat information (other user is typing) and instantly displays messages and other notifications.
