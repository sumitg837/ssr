import Loadable from 'react-loadable';
import { Link } from 'react-router-dom'

import Grid from '../src/_components/grid'
import { fetchPopularRepos } from '../src/_actions'

// const TitleAsync = Loadable({
//     loader: () => import(/* webpackChunkName: "title" */'./components/title.jsx'),
//     loading() {
//         return <div>Loading...</div>
//     }
// });


const HOME = () => {
    return (
        <div>
            <div>
                Select a Language
            </div>
        </div>
    )
}
const NotFound = () => {
    return (
        <div>
            <h1>NOT FOUND</h1>
        </div>
    )
}

// const LoremIpsumAsync = Loadable({
//     loader: () => import(/* webpackChunkName: "lorem-ipsum" */'./components/loremIpsum.jsx'),
//     loading() {
//         return <div>Loading...</div>
//     }
// });

const Routes = [
    {
        path: '/',
        exact: true,
        component: HOME
    },
   /*  {
        path: '/todo',
        exact: true,
        component: TitleAsync,
        loadData: () => loadData('todos')
    },
    {
        path: '/about',
        exact: true,
        component: LoremIpsumAsync,
        loadData: () => loadData('todos')
    }, */
    {
        path: '/popular/:id',
        component: Grid,
        fetchInitialData: (path = '') =>
            fetchPopularRepos(path.split('/').pop())
    }
];


export default Routes;