import { marked } from "marked";
import { API_URL, PostsCollection } from "../../api";

export default async function Post({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  try {
    const res = await fetch(
      `${API_URL}/posts?locale=${params.locale}&filters[slug]=${params.slug}`
    );
    const json: PostsCollection = await res.json();

    const post = json.data[0];

    const content = post?.attributes?.content
      ? marked(post.attributes.content)
      : "";

    return (
      <div>
        <article
          className="prose lg:prose-xl"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    );
  } catch (error) {
    console.error("Hata:", error);
    return (
      <div>
        <p>Hata oluştu. İçerik yüklenemedi.</p>
      </div>
    );
  }
}
