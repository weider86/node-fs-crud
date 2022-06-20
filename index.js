import { writeFileSync, readFileSync } from 'fs';

console.log(`node-fs-crud`);

const postsJson = readFileSync('./db.json', { encoding: 'utf-8' });

const crud = {
  posts: JSON.parse(postsJson),
  create({ id, content }) {
    const post = { id, content };
    crud.posts.push(post);
    writeFileSync('./db.json', JSON.stringify(crud.posts), {
      encoding: 'utf-8',
    });
  },
  read() {
    crud.posts = readFileSync('./db.json', { encoding: 'utf-8' });
    return crud.posts;
  },
  update() {},
};

// Create
crud.create({ id: 6, content: 'good dawn 44' });

// Read
console.log(`read()::: ${crud.read()}`);

// Update

// Delete
