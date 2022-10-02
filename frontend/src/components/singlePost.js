export function Post({ _id, post, handleLike }) {
  return (
    <a href={`/post/${_id}`}>
      <div className="post" data-id={_id}>
        <span className="login">{post.login}</span>
        <img className="post_image" src={post.imageUrl} alt={post.username} />
        <div>
          <button className="likeButton" onClick={handleLike}>
            👍
          </button>
          <span className="likeText"></span>
          <span className="disLikeText"></span>
        </div>
        <p className="text_post">{post.post_text}</p>
      </div>
    </a>
  );
}
