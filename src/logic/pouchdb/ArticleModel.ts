import FeedParser from 'feedparser'
import { IArticle } from '../../schemas/'
import Utils from '../../utils'
import BaseModel from './BaseModel'

export default class ArticleModel extends BaseModel<IArticle> {
    public constructor() {
        super('articles', [
            {index: {
                fields: ['feedId'], name: 'feedId',
            }},
            {index: {
                fields: ['time'], name: 'time',
            }},
        ])
    }
    public makeArticleBaseOnItem(item: FeedParser.Item, feedId: string = '') {
        const article: IArticle = {
            _id: item.guid,
            _rev: '',
            author: item.author,
            categories: item.categories,
            comments: item.comments,
            createTime: Date.now(),
            deleteTime: 0,
            description: item.description,
            enclosures: item.enclosures,
            feedId,
            image: item.image.url,
            isStarred: false,
            isUnread: true,
            link: item.link,
            originLink: item.origlink,
            publishTime: item.pubdate ? item.pubdate.getTime() : Date.now(),
            summary: item.summary,
            time: item.date ? item.date.getTime() : Date.now(),
            title: item.title,
        }
        return article
    }
    public async batchInsertArticles(articles: IArticle[]) {
        await Utils.batchOperate(this.insertArticle, articles)
    }
    public insertArticle = async (article: IArticle, feedId?: string) => {
        article.feedId = feedId || article.feedId
        try {
            const oldArticle = await this.get(article._id)
            article._id = oldArticle._id
            article._rev = oldArticle._rev
            article.isStarred = oldArticle.isStarred
            article.isUnread = oldArticle.isUnread
            return this.put(article)
        } catch (error) {
            return this.post(article)
        }
    }
    public async batchReadArticles(ids: string[]) {
        const changes = await Utils.batchOperate(this.readArticle, ids)
        return changes
    }
    public readArticle = async (id: string) => {
        try {
            const article = await this.get(id)
            if (article.isUnread) {
                article.isUnread = false
                return this.put(article)
            }
            return null
        } catch (error) {
            return null
        }
    }
    public async getAllArticles() {
        const articles = await this.find({
            fields: ['_id', '_rev', 'author', 'feedId', 'isUnread', 'link', 'summary', 'time', 'title'],
            selector: {},
            sort: ['createTime'],
        }, ['createTime'])
        return articles.docs
    }
    public async queryArticles(selector: PouchDB.Find.Selector = {}, limit: number = 9999, skip: number = 0) {
        if (!selector.time) {
            selector.time = { $exists: true }
        }
        const articles = await this.find({
            fields: ['_id', '_rev', 'author', 'feedId', 'isUnread', 'link', 'summary', 'time', 'title'],
            limit,
            selector,
            skip,
            sort: [{ time: 'desc'}],
        }, ['time', 'feedId'])
        return articles.docs
    }

    public async getArticleContent(id: string) {
        const article = await this.get(id)
        if (article) {
            return article.description
        }
        return ''
    }
}
