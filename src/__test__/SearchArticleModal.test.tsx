import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import EnzymeToJson from 'enzyme-to-json'
import Immutable from 'immutable'
import React from 'react'
import ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import { Provider as ReduxProvider } from 'react-redux'
import SearchArticleModal, { ISearchArticleModalProps } from '../components/SearchArticleModal'
import { messages } from '../locales'
import store from '../redux'
import { IArticle } from '../schemas'

Enzyme.configure({ adapter: new EnzymeAdapter() })
const intlProviderProps: IntlProvider.Props = {
    locale: 'en-US',
    messages: messages['en-US'],
}

describe('SearchArticleModal Testing', () => {
    const propsMock: ISearchArticleModalProps = {
        articles: Immutable.List<IArticle>([]),
        onCancel: jest.fn(),
        onItemChoose: jest.fn(),
        visible: true,
    }

    // it('renders without crashing', () => {
    //     const div = document.createElement('div')
    //     ReactDOM.render(
    //         <IntlProvider {...intlProviderProps} >
    //             <SearchArticleModal {...propsMock} />
    //         </IntlProvider>,
    //         div
    //     )
    //     ReactDOM.unmountComponentAtNode(div)
    // })

    it('dom testing', () => {
        const component = Enzyme.shallow(
            <ReduxProvider store={store}>
                <IntlProvider {...intlProviderProps}>
                    <SearchArticleModal {...propsMock} />
                </IntlProvider>
            </ReduxProvider>
        )
    })

    it('snapshot testing', () => {
        const component = Enzyme.mount(
            <ReduxProvider store={store}>
                <IntlProvider {...intlProviderProps}>
                    <SearchArticleModal {...propsMock} />
                </IntlProvider>
            </ReduxProvider>
        )
        const tree = EnzymeToJson(component)
        expect(tree).toMatchSnapshot()
    })
})
