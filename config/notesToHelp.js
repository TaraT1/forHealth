//Query Mybrary
router.get('/', async (req, res) => {
    let query = Book.find()
    if (req.query.title != null && req.query.title != '') {
        query = query.regex('title', new RegExp(req.query.title, 'i'))
    }
    //if published before or after
    if (req.query.publishedBefore != null && req.query.publishedBefore != '') {
        query = query.lte('publishDate', req.query.publishedBefore)
    }
    // query if published after

    try {
        const books = await 
        query.exec()
        res.render('books/index', {
            books: books,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
})


/* //date ejs
<input type="date" name ='publishDate'
    value="<% book.publishDate == null ? '' : 
    book.publishDate.toISOString().split('T'[0]) %>">
*/

//Cast error - link profile to provider

//chatgpt full stack app setup
/* list profiles `views/profiles/profiles.ejs`
<%- include('../layout', { title: 'Profiles' }) %>
<h1>Profiles</h1>
<a href="/profiles/add" class="btn btn-primary">Add Profile</a>
<ul class="list-group mt-4">
    <% profiles.forEach(function(profile) { %>
        <li class="list-group-item">
            <a href="/profiles/edit/<%= profile._id %>"><%= profile.name %></a>
        </li>
    <% }) %>
</ul>
forms with dropdown menus
<%- include('../layout', { title: 'Edit Profile' }) %>
<h1><%= profile ? 'Edit' : 'Add' %> Profile</h1>
<form action="/profiles/<%= profile ? profile._id + '?_method=PUT' : '' %>" method="POST">
    <div class="form-group">
        <label for="name">Name</label>
        <input type="text" name="name" id="name" class="form-control" value="<%= profile ? profile.name : '' %>">
    </div>
    <!-- other form fields -->
    <div class="form-group">
        <label for="providers">Providers</label>
        <select name="providers" id="providers" class="form-control" multiple>
            <% allProviders.forEach(function(provider) { %>
                <option value="<%= provider._id %>"
                    <% if (profile && profile.providers.includes(provider._id)) { %>
                        selected
                    <% } %>
                ><%= provider.name %></option>
            <% }) %>
        </select>
    </div>
    <button type="submit" class="btn btn-primary">Save</button>
</form>
ORIG provider form code to link profile
<div>
    <label for="profile" class="form-label">Associate Profile</label>
    <select class="form-select" id="profile" name="profile" >
        <% for(let i=0; i < profiles.length; i++) { %>
            <option value="<%= profiles[i].name %>">
                <%= profiles[i].name %>
            </option> 
        <% } %> 
    </select>
</div>

Link provider(s) to profile; err: providers is not defined
  <div> //***Show providers names. Can have multiple providers for each profile
  <label for="providers" class="form-label">Providers</label>
    <input type="text" class="form-control" id="providers" name="providers" value="<%= providers._id %>">
  </div>

  <div>(formfields profiles)
    <label for="providers">Providers</label>
    <select name="providers" id="providers" class="form-control" multiple>
      <% providers.forEach(function(provider) { %>
      <option value="<%= provider._id %>"
        <% if (profile && profile.providers && profile.providers.includes(provider._id)) { %>
          selected
        <% } %>
        ><%= provider.name %>
      </option>
      <% }) %>
    </select>
  </div>


*/

Happens on latest as well. Just need to add new in front of the ObjectId creation.

const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  user: mongoose.Schema.Types.ObjectId,
  address: mongoose.Schema.Types.ObjectId
});

const Test = mongoose.model('Test', testSchema);

async function run() {
  await mongoose.connect('mongodb://localhost:27017');
  await mongoose.connection.dropDatabase();
  await Test.create({
    user: mongoose.Types.ObjectId(),
    address: mongoose.Types.ObjectId()
  })

  await Test.find().populate("user  address");
  console.log('done');
}

run();