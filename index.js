import { writeFileSync, readFileSync } from 'fs';

console.log(`node-fs-crud`);

const crud = {
  posts: JSON.parse(readFileSync('./db.json', { encoding: 'utf-8' })),
  create({ id, content }) {
    const post = { id, content };

    if (crud.posts.find((item) => item.id === post.id)) {
      console.log('Erron on creating post: id already exists.');
      return;
    }

    crud.posts.push(post);

    writeFileSync(
      './db.json',
      JSON.stringify(crud.posts.sort((a, b) => a.id - b.id)),
      {
        encoding: 'utf-8',
      }
    );
  },
  read() {
    crud.posts = readFileSync('./db.json', { encoding: 'utf-8' });
    return crud.posts;
  },
  update({ id, content }) {
    const post = { id, content };

    const newItem = crud.posts.find((item) =>
      item.id === post.id
        ? (item.content = post.content)
        : console.log('Erron on updating post: id does not exists.')
    );

    const newArr = [...crud.posts.filter((i) => i.id !== post.id), newItem];

    writeFileSync('./db.json', JSON.stringify(newArr), {
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
crud.create({ id: 8, content: 'hi bedidos!' });

// Update
// crud.update({
//   id: 6,
//   content: `hello thiaguera!!`,
// });

// Delete
// crud.delete({ id: 1 });

// Read
console.log(JSON.parse(crud.read()));
