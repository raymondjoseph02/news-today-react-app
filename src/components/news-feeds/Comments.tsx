import { useState } from "react";

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  date: string;
  replies?: Comment[];
}

interface CommentsProps {
  articleId?: string;
}

// Mock data for demonstration
const mockComments: Comment[] = [
  {
    id: "1",
    author: {
      name: "Ethan Carter",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    },
    content:
      "Great coverage of the conference! It's exciting to see the progress in AI and sustainable tech.",
    date: "July 27, 2024",
    replies: [
      {
        id: "2",
        author: {
          name: "Olivia Bennett",
          avatar:
            "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
        },
        content:
          "I agree! The focus on ethical considerations is also very important.",
        date: "July 27, 2024",
      },
    ],
  },
];

function Comments({ articleId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState("");

  console.log("Loading comments for article:", articleId);

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: {
        name: "You", 
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face",
      },
      content: newComment,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    setComments([...comments, comment]);
    setNewComment("");
  };

  return (
    <div className="space-y-6">
      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-4">
            {/* Main Comment */}
            <div className="flex gap-3">
              <img
                src={comment.author.avatar}
                alt={comment.author.name}
                className="w-12 h-12 rounded-full object-cover shrink-0"
                onError={(e) => {
                  (
                    e.target as HTMLImageElement
                  ).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    comment.author.name
                  )}&size=48&background=3B82F6&color=ffffff`;
                }}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-800">
                    {comment.author.name}
                  </h4>
                  <span className="text-sm text-gray-500">{comment.date}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {comment.content}
                </p>
              </div>
            </div>

            {/* Replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="ml-12 space-y-4">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="flex gap-3">
                    <img
                      src={reply.author.avatar}
                      alt={reply.author.name}
                      className="w-10 h-10 rounded-full object-cover shrink-0"
                      onError={(e) => {
                        (
                          e.target as HTMLImageElement
                        ).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          reply.author.name
                        )}&size=40&background=3B82F6&color=ffffff`;
                      }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-800">
                          {reply.author.name}
                        </h4>
                        <span className="text-sm text-gray-500">
                          {reply.date}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {reply.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Comment Form */}
      <div className="flex gap-3">
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face"
          alt="Your avatar"
          className="w-12 h-12 rounded-full object-cover shrink-0 hidden sm:flex"
          onError={(e) => {
            (
              e.target as HTMLImageElement
            ).src = `https://ui-avatars.com/api/?name=You&size=48&background=6B7280&color=ffffff`;
          }}
        />
        <div className="flex-1">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-colors bg-[#EAEEF3]"
            rows={3}
          />
          <div className="flex justify-end mt-3">
            <button
              onClick={handleSubmitComment}
              disabled={!newComment.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Post Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comments;
