import { getPosts } from '../services/api';
import styles from './home.module.css';
import { getPostContent } from '../utils/content';

export const revalidate = 3600; // Revalidate every hour

async function HomePage() {
  try {
    // Returns an error if strapi does not have a content type (Post) set and a corresponding entry.
    const { data: posts, meta } = await getPosts();

    if (!posts || posts.length === 0) {
      return (
        <main className={styles.main}>
          <h1 className={styles.title}>Main title</h1>
          <p>No posts found</p>
        </main>
      );
    }

    return (
      <main className={styles.main}>
        <h1 className={styles.title}>Main title</h1>
        
        <div className={styles.grid}>
          {posts.map((post) => (
            <article key={post.id} className={styles.card}>
              <h2>{post.title}</h2>
              <p>{getPostContent(post.content)}</p>
              <div className={styles.meta}>
                <time>
                  {new Date(post.publishedAt).toLocaleDateString('ru-RU')}
                </time>
              </div>
            </article>
          ))}
        </div>

        {meta.pagination.pageCount > 1 && (
          <div className={styles.pagination}>
            <p>
              Страница {meta.pagination.page} из {meta.pagination.pageCount}
            </p>
          </div>
        )}
      </main>
    );
  } catch (error) {
    console.error('Error fetching posts:', error);
    return (
      <main className={styles.main}>
        <h1 className={styles.title}>Main title</h1>
        <p>An error occurred while loading posts</p>
      </main>
    );
  }
}

export default HomePage; 