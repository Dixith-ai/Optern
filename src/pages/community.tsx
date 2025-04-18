import { useAuth } from '@/lib/auth-context';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { 
  ArrowUpIcon, 
  ArrowDownIcon, 
  MessageCircleIcon, 
  ShareIcon, 
  TrendingUpIcon, 
  ClockIcon, 
  ThumbsUpIcon,
  ImageIcon,
  LinkIcon,
  SendIcon
} from 'lucide-react';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    isVerifiedMentor: boolean;
    type: 'student' | 'company' | 'mentor';
  };
  content: string;
  image?: string;
  link?: string;
  hashtags: string[];
  createdAt: Date;
  upvotes: number;
  downvotes: number;
  comments: number;
  shares: number;
  userVote?: 'up' | 'down' | null;
}

type SortOption = 'recent' | 'trending' | 'discussed';

const SAMPLE_POSTS: Post[] = [
  {
    id: '1',
    author: {
      id: '1',
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
      isVerifiedMentor: true,
      type: 'mentor'
    },
    content: 'Just wrapped up another successful interview prep session! Here are my top tips for technical interviews: 1) Practice explaining your thought process, 2) Start with a simple solution before optimizing, 3) Ask clarifying questions. What strategies work for you? 💡',
    hashtags: ['InterviewTips', 'TechCareers'],
    createdAt: new Date('2024-03-15T10:00:00'),
    upvotes: 42,
    downvotes: 2,
    comments: 15,
    shares: 8
  },
  {
    id: '2',
    author: {
      id: '2',
      name: 'TechCorp',
      avatar: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80',
      isVerifiedMentor: false,
      type: 'company'
    },
    content: 'We\'re excited to announce our Summer 2024 internship program! Looking for passionate developers who want to work on cutting-edge projects. Pro tip: Show us your side projects in your application! 🚀',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    hashtags: ['Internships', 'TechJobs', 'CareerAdvice'],
    createdAt: new Date('2024-03-14T15:30:00'),
    upvotes: 156,
    downvotes: 0,
    comments: 45,
    shares: 23
  }
];

export function CommunityPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>(SAMPLE_POSTS);
  const [sortOption, setSortOption] = useState<SortOption>('recent');
  const [newPost, setNewPost] = useState('');
  const [selectedHashtag, setSelectedHashtag] = useState<string | null>(null);

  const handleVote = (postId: string, voteType: 'up' | 'down') => {
    if (!user) return;

    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          const currentVote = post.userVote;
          let upvotes = post.upvotes;
          let downvotes = post.downvotes;

          // Remove previous vote
          if (currentVote === 'up') upvotes--;
          if (currentVote === 'down') downvotes--;

          // Add new vote if it's different from the current vote
          if (currentVote !== voteType) {
            if (voteType === 'up') upvotes++;
            if (voteType === 'down') downvotes++;
          }

          return {
            ...post,
            upvotes,
            downvotes,
            userVote: currentVote === voteType ? null : voteType
          };
        }
        return post;
      })
    );
  };

  const handleSubmitPost = () => {
    if (!user || !newPost.trim()) return;

    const hashtags = newPost.match(/#[\w]+/g)?.map(tag => tag.slice(1)) || [];

    const newPostObj: Post = {
      id: Date.now().toString(),
      author: {
        id: user.id,
        name: user.email.split('@')[0],
        avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80`,
        isVerifiedMentor: false,
        type: user.type
      },
      content: newPost,
      hashtags,
      createdAt: new Date(),
      upvotes: 0,
      downvotes: 0,
      comments: 0,
      shares: 0
    };

    setPosts(prevPosts => [newPostObj, ...prevPosts]);
    setNewPost('');
  };

  const sortedPosts = [...posts].sort((a, b) => {
    switch (sortOption) {
      case 'trending':
        const scoreA = a.upvotes - a.downvotes;
        const scoreB = b.upvotes - b.downvotes;
        return scoreB - scoreA;
      case 'discussed':
        return b.comments - a.comments;
      default:
        return b.createdAt.getTime() - a.createdAt.getTime();
    }
  }).filter(post => 
    !selectedHashtag || post.hashtags.includes(selectedHashtag)
  );

  const allHashtags = Array.from(
    new Set(posts.flatMap(post => post.hashtags))
  );

  return (
    <div className="flex-1 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Community</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Share and learn from the Optern community</p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant={sortOption === 'recent' ? 'primary' : 'outline'}
              onClick={() => setSortOption('recent')}
              className="flex items-center"
            >
              <ClockIcon className="h-4 w-4 mr-2" />
              Recent
            </Button>
            <Button
              variant={sortOption === 'trending' ? 'primary' : 'outline'}
              onClick={() => setSortOption('trending')}
              className="flex items-center"
            >
              <TrendingUpIcon className="h-4 w-4 mr-2" />
              Trending
            </Button>
            <Button
              variant={sortOption === 'discussed' ? 'primary' : 'outline'}
              onClick={() => setSortOption('discussed')}
              className="flex items-center"
            >
              <MessageCircleIcon className="h-4 w-4 mr-2" />
              Most Discussed
            </Button>
          </div>
        </div>

        {user && (
          <Card className="mb-8">
            <CardContent className="pt-6">
              <textarea
                placeholder="Share your thoughts, experiences, or advice..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="w-full min-h-[100px] p-4 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white resize-none"
              />
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Add Image
                </Button>
                <Button variant="outline" size="sm">
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Add Link
                </Button>
              </div>
              <Button onClick={handleSubmitPost} disabled={!newPost.trim()}>
                <SendIcon className="h-4 w-4 mr-2" />
                Post
              </Button>
            </CardFooter>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            {sortedPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <CardHeader className="flex flex-row items-center space-x-4 p-6">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {post.author.name}
                      </span>
                      {post.author.isVerifiedMentor && (
                        <Badge variant="secondary">Verified Mentor</Badge>
                      )}
                      {post.author.type === 'company' && (
                        <Badge variant="secondary">Company</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDistanceToNow(post.createdAt, { addSuffix: true })}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="px-6 py-2">
                  <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                    {post.content}
                  </p>
                  {post.image && (
                    <img
                      src={post.image}
                      alt="Post attachment"
                      className="mt-4 rounded-lg w-full"
                    />
                  )}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.hashtags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={selectedHashtag === tag ? 'primary' : 'secondary'}
                        className="cursor-pointer"
                        onClick={() => setSelectedHashtag(selectedHashtag === tag ? null : tag)}
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="px-6 py-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleVote(post.id, 'up')}
                        className={post.userVote === 'up' ? 'text-green-600' : ''}
                      >
                        <ArrowUpIcon className="h-4 w-4 mr-1" />
                        {post.upvotes}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleVote(post.id, 'down')}
                        className={post.userVote === 'down' ? 'text-red-600' : ''}
                      >
                        <ArrowDownIcon className="h-4 w-4 mr-1" />
                        {post.downvotes}
                      </Button>
                    </div>
                    <Button variant="outline" size="sm">
                      <MessageCircleIcon className="h-4 w-4 mr-1" />
                      {post.comments}
                    </Button>
                    <Button variant="outline" size="sm">
                      <ShareIcon className="h-4 w-4 mr-1" />
                      {post.shares}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <h3 className="font-semibold text-gray-900 dark:text-white">Popular Topics</h3>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {allHashtags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedHashtag === tag ? 'primary' : 'secondary'}
                      className="cursor-pointer"
                      onClick={() => setSelectedHashtag(selectedHashtag === tag ? null : tag)}
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {!user && (
              <Card className="mt-6">
                <CardContent className="pt-6">
                  <p className="text-center text-gray-600 dark:text-gray-400">
                    <Link to="/login" className="text-blue-600 hover:underline">
                      Sign in
                    </Link>{' '}
                    to join the conversation and share your experiences.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}