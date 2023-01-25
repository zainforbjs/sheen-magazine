import { NavigationScreenConfig } from 'types/navigation';
import { NavigationBlog } from 'types/navigation/MainApp/blog';
import Post from 'features/MainApp/Blog/Post';
import Home from 'features/MainApp/Blog/Home';

const scenes: NavigationScreenConfig<NavigationBlog>[] = [
  {
    name: 'Home',
    Component: Home
  },
  {
    name: 'Post',
    Component: Post
  }
];

export default scenes;
