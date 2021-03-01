/* -----------------
 * !!! Router.js !!!
 * -----------------
 * Usage: 根据config.js提供的路由规则，使用react-router-dom配置路由，最终export给indexPage的index.js
 */

import react, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Config from './Config';
import Header from '../pages/index/components/Header/Header';


export default function MyRouter() {
	return (
		<BrowserRouter>
			<Suspense fallback={<div>Loading...</div>} maxDuration={1000}>
				<Switch>
					{
						Config.map( function(item, index) {
							return ( <Route exact={item.exact} path={item.path} key={index} component={item.component} /> );
						} )
					}
				{/* {
						Config.map( (item, index) => {
							return <Route exact={item.exact} path={item.path} key={index} component={item.component} />
						} )
					} */}
					<Route component={Header} />
				</Switch>
			</Suspense>
		</BrowserRouter>
	);
}