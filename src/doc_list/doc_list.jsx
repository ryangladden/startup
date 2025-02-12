import React from 'react';

export function DocList() {
  return (
    <main>
    <section class="doc-list-header inline">
        <h3>Username's Documents</h3>
        <input type="text" class="form-control search-input" placeholder="search by author, document type, date..."/>
        <button class="btn btn-secondary">Search</button>
    </section>
    <div class="container-fluid">
        <div class="filter">
            <p>filterstuff</p>
        </div>
        <div class="card-deck row">
            <div class="col-md-3 col-sm-4 col-6">
                <div class="card">
                    <a href="doc-viewer.html">
                        <img src="letter.png" class="card-img-top"/>
                        <div class="card-body">
                            <h4 class="card-title">Document1</h4>
                            <h6 class="card-subtitle text-muted">Letter</h6>
                            <p class="card-text">Author</p>
                            <p class="card-text">Date</p>
                        </div>
                    </a>
                        <div class="card-body card-nav">
                            <a href="doc-viewer.html" class="card-link">Open</a>
                            <a href="sharing.html" class="card-link">Share</a>
                        </div>
                </div>
            </div>
            <div class="col-md-3 col-sm-4 col-6">
                <div class="card">
                    <a href="doc-viewer.html">
                        <img src="letter2.png" class="card-img-top"/>
                        <div class="card-body">
                            <h4 class="card-title">Document2</h4>
                            <h6 class="card-subtitle text-muted">Letter</h6>
                            <p class="card-text">Author: Jimmy John</p>
                            <p class="card-text">1 April 1999</p>
                        </div>
                    </a>
                        <div class="card-body card-nav">
                            <a href="doc-viewer.html" class="card-link">Open</a>
                            <a href="sharing.html" class="card-link">Share</a>
                        </div>
                </div>
            </div>
            <div class="col-md-3 col-sm-4 col-6">
                <div class="card">
                    <a href="doc-viewer.html">
                        <img src="journal.png" class="card-img-top"/>
                        <div class="card-body">
                            <h4 class="card-title">Document3</h4>
                            <h6 class="card-subtitle text-muted">Journal Entry</h6>
                            <p class="card-text">Author: Jimmy John Jr.</p>
                            <p class="card-text">3 September 2009</p>
                        </div>
                    </a>
                        <div class="card-body card-nav">
                            <a href="doc-viewer.html" class="card-link">Open</a>
                            <a href="sharing.html" class="card-link">Share</a>
                        </div>
                </div>
            </div>
            <div class="col-md-3 col-sm-4 col-6">
                <div class="card">
                    <a href="doc-viewer.html">
                        <img src="letter.png" class="card-img-top"/>
                        <div class="card-body">
                            <h4 class="card-title">Document4</h4>
                            <h6 class="card-subtitle text-muted">Letter</h6>
                            <p class="card-text">Author: Ephen Stephen</p>
                            <p class="card-text">14 January 1967</p>
                        </div>
                    </a>
                        <div class="card-body card-nav">
                            <a href="doc-viewer.html" class="card-link">Open</a>
                            <a href="sharing.html" class="card-link">Share</a>
                        </div>
                </div>
            </div>
            <div class="col-md-3 col-sm-4 col-6">
                <div class="card">
                    <a href="doc-viewer.html">
                        <img src="letter2.png" class="card-img-top"/>
                        <div class="card-body">
                            <h4 class="card-title">Document5</h4>
                            <h6 class="card-subtitle text-muted">Journal Entry</h6>
                            <p class="card-text">Author: Joe Mama</p>
                            <p class="card-text">23 December 1988</p>
                        </div>
                    </a>
                        <div class="card-body card-nav">
                            <a href="doc-viewer.html" class="card-link">Open</a>
                            <a href="sharing.html" class="card-link">Share</a>
                        </div>
                </div>
            </div>
            <div class="col-md-3 col-sm-4 col-6">
                <div class="card">
                    <a href="doc-viewer.html">
                        <img src="journal.png" class="card-img-top"/>
                        <div class="card-body">
                            <h4 class="card-title">Document6</h4>
                            <h6 class="card-subtitle text-muted">Journal Entry</h6>
                            <p class="card-text">Author: Jimmy John</p>
                            <p class="card-text">19 June 2000</p>
                        </div>
                    </a>
                        <div class="card-body card-nav">
                            <a href="doc-viewer.html" class="card-link">Open</a>
                            <a href="sharing.html" class="card-link">Share</a>
                        </div>
                </div>
            </div>
            <div class="col-md-3 col-sm-4 col-6">
                <div class="card">
                    <a href="doc-viewer.html">
                        <img src="letter.png" class="card-img-top"/>
                        <div class="card-body">
                            <h4 class="card-title">Document7</h4>
                            <h6 class="card-subtitle text-muted">Letter</h6>
                            <p class="card-text">Author: Joe Mama</p>
                            <p class="card-text">22 February 2002</p>
                        </div>
                    </a>
                        <div class="card-body card-nav">
                            <a href="doc-viewer.html" class="card-link">Open</a>
                            <a href="sharing.html" class="card-link">Share</a>
                        </div>
                </div>
            </div>
            <div class="col-md-3 col-sm-4 col-6">
                <div class="card">
                    <a href="doc-viewer.html">
                        <img src="letter2.png" class="card-img-top"/>
                        <div class="card-body">
                            <h4 class="card-title">Document8</h4>
                            <h6 class="card-subtitle text-muted">Letter</h6>
                            <p class="card-text">Author: Ephen Stephen</p>
                            <p class="card-text">5 March 2001</p>
                        </div>
                    </a>
                        <div class="card-body card-nav">
                            <a href="doc-viewer.html" class="card-link">Open</a>
                            <a href="sharing.html" class="card-link">Share</a>
                        </div>
                </div>
            </div>
            <div class="col-md-3 col-sm-4 col-6">
                <div class="card">
                    <a href="doc-viewer.html">
                        <img src="journal.png" class="card-img-top"/>
                        <div class="card-body">
                            <h4 class="card-title">Document9</h4>
                            <h6 class="card-subtitle text-muted">Journal Entry</h6>
                            <p class="card-text">Author: Jimmy John Jr.</p>
                            <p class="card-text">29 February 2004</p>
                        </div>
                    </a>
                        <div class="card-body card-nav">
                            <a href="doc-viewer.html" class="card-link">Open</a>
                            <a href="sharing.html" class="card-link">Share</a>
                        </div>
                </div>
            </div>
        </div>
    </div>
</main>
  );
}