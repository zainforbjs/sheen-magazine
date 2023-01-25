import { DetailsId, DynamicObject, WordPressContent } from 'types';

export type CategoryBlog = DetailsId & 
{
	count: number;
	name: string;
	slug: string;
	taxonomy: string;
}

export type CommentBlog = DetailsId & 
{
	post: number;
	author_name: string;
	date: string;
	content: WordPressContent;
	author_avatar_urls: DynamicObject
};

export type ItemBlog = DetailsId & 
{
	date: string;
	title: WordPressContent; 
	content: WordPressContent;
	link: string;
	categories: number[];
	tags: number[]; 
	jetpack_featured_media_url: string;	
};

export type TagBlog = DetailsId & 
{
	name: string; 
}; 