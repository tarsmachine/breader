import { IArticle, IReduxAction } from '../../schemas'

export const ArticlesActionTypes = {
    SET_ALL_ARTICLES_READ_AT: 'SET_ALL_ARTICLES_READ_AT',
    SET_ARTICLES: 'SET_ARTICLES',
    SET_ARTICLES_FILTER: 'SET_ARTICLES_FILTER',
    SET_SELECTED_ARTICLE: 'SET_SELECTED_ARTICLE',
    SET_SELECTED_ARTICLE_CONTENT: 'SET_SELECTED_ARTICLE_CONTENT',

    ASYNC_FETCH_ARTICLES: 'ASYNC_FETCH_ARTICLES',
    ASYNC_FILTER_ARTICLES: 'ASYNC_FILTER_ARTICLES',
    ASYNC_SELECT_AND_READ_ARTICLE: 'ASYNC_SELECT_AND_READ_ARTICLE',
    ASYNC_SET_ALL_ARTICLES_READ: 'ASYNC_SET_ALL_ARTICLES_READ',
    ASYNC_STAR_ARTICLE: 'ASYNC_STAR_ARTICLE',
}

export const setAllArticlesReadAtAction = (allReadAt: number): IReduxAction => ({
    payload: { allReadAt },
    type: ArticlesActionTypes.SET_ALL_ARTICLES_READ_AT,
})

export const setArticlesFilterAction = (filter: string): IReduxAction => ({
    payload: { filter },
    type: ArticlesActionTypes.SET_ARTICLES_FILTER,
})

export const setSelectedArticleAction = (articleId: string, articleIndex: number): IReduxAction => ({
    payload: { articleId, articleIndex },
    type: ArticlesActionTypes.SET_SELECTED_ARTICLE,
})

export const setSelectedArticleContentAction = (articleContent: string): IReduxAction => ({
    payload: { articleContent },
    type: ArticlesActionTypes.SET_SELECTED_ARTICLE_CONTENT,
})

export const setArticlesAction = (articles: IArticle[]): IReduxAction => ({
    payload: { articles },
    type: ArticlesActionTypes.SET_ARTICLES,
})

export const asyncFetchArticlesAction = (): IReduxAction => ({
    payload: null,
    type: ArticlesActionTypes.ASYNC_FETCH_ARTICLES,
})

export const asyncFilterArticlesAction = (filter: string): IReduxAction => ({
    payload: { filter },
    type: ArticlesActionTypes.ASYNC_FILTER_ARTICLES,
})

export const asyncSelectAndReadArticlesAction = (articleId: string, articleIndex: number): IReduxAction => ({
    payload: { articleId, articleIndex },
    type: ArticlesActionTypes.ASYNC_SELECT_AND_READ_ARTICLE,
})

export const asyncStarArticleAction = (articleId: string, isStarred: boolean): IReduxAction => ({
    payload: { articleId, isStarred },
    type: ArticlesActionTypes.ASYNC_STAR_ARTICLE,
})

export const asyncSetAllArticlesReadAction = (articleIds: string[]): IReduxAction => ({
    payload: { articleIds },
    type: ArticlesActionTypes.ASYNC_SET_ALL_ARTICLES_READ,
})
