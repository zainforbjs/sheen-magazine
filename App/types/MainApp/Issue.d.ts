import { ParamsGetList } from "types";
export type ItemIssueType = {
  dateTitle?: string;
  imageUri?: string;
  author?: string;
  createdAt?: string;
  description?: string;
  issueId?: number;
  key?: string;
  paid?: boolean;
  title?: string;
  totalViews?: number;
  updatedAt?: string;
  url: string;
};

export type ParamsGetListIssue = ParamsGetList & 
{
  title?: string; 
  author?: string; 
};