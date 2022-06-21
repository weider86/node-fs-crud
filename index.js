import { writeFileSync, readFileSync } from 'fs';

console.log(`node-fs-crud`);

const postsJson = readFileSync('./db.json', { encoding: 'utf-8' });

const crud = {
  posts: JSON.parse(postsJson),
  create({ id, content }) {
    const post = { id, content };
    crud.posts.map((item) =>
      item.id === post.id
        ? console.log('Erron on creating post: id already exusts.')
        : false
    );

    crud.posts.push(post);

    writeFileSync('./db.json', JSON.stringify(crud.posts), {
      encoding: 'utf-8',
    });
  },
  read() {
    crud.posts = readFileSync('./db.json', { encoding: 'utf-8' });
    return crud.posts;
  },
  update({ id, content }) {
    const post = { id, content };

    crud.posts.find((item) =>
      item.id === post.id
        ? (item.content = post.content)
        : console.log('Erron on updating post: id does not exusts.')
    );

    writeFileSync('./db.json', JSON.stringify(crud.posts), {
      encoding: 'utf-8',
    });
  },
  delete({ id }) {
    const post = { id };

    const newArr = crud.posts.filter((item) => {
      return item.id !== post.id;
    });

    writeFileSync('./db.json', JSON.stringify(newArr), {
      encoding: 'utf-8',
    });
  },
};

// Create
// crud.create({ id: 1, content: 'hello people!' });

// Update
// crud.update({ id: 2, content: 'hi guys!' });

// Delete
// crud.delete({ id: 8 });

// Read
console.log(JSON.parse(crud.read()));
