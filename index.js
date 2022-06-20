const fs = require('fs');

console.log('crud node fs');

const crud = {
  posts: [],
  create({ id, content }) {
    const post = { id, content };
    crud.posts.push(post);
    fs.writeFileSync('./db.json', JSON.stringify(crud.posts), {
      encoding: 'utf-8',
    });
  },
  read() {
    crud.posts = fs.readFileSync('./db.json', { encoding: 'utf-8' });
    return crud.posts;
  },
};

// Create
crud.create({ id: 1, content: 'hello people' });
crud.create({ id: 2, content: 'hi guys' });
crud.create({ id: 3, content: 'hi everyone' });

// Read
console.log(`reading files: ${crud.read()}`);

// Update

// Delete
