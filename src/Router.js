/**
 * Copyright (c) 2015-present, Pavel Aksonov
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React, {Component, StyleSheet, ScrollView, Text, NavigationExperimental} from 'react-native';
const {
    AnimatedView: NavigationAnimatedView,
    Card: NavigationCard,
    RootContainer: NavigationRootContainer,
    Header: NavigationHeader,
    } = NavigationExperimental;
import Actions from './Actions';
import getInitialState from './State';
import Reducer from './Reducer';
import DefaultRenderer from './DefaultRenderer';

export default class extends Component {
    constructor(props) {
        super(props);
        this._renderNavigation = this._renderNavigation.bind(this);
        const routes = this.props.routes || Actions.create(props.children);
        const initialState = getInitialState(routes);
        this.reducer = this.props.reducer || Reducer({initialState, routes});
        this.component = this.props.component || DefaultRenderer;

    }

    _renderNavigation(navigationState, onNavigate) {
        Actions.callback = props=>onNavigate(props);
        if (!navigationState) {
            return null;
        }
        const Component = this.component;
        const props = navigationState.routes[navigationState.routes.current];

        return (
            <Component
                navigationState={navigationState}
                onNavigate={onNavigate} data={props}/>
        );
    }

    render(){
        return <NavigationRootContainer
            reducer={this.reducer}
            renderNavigation={this._renderNavigation}
        />
    }
}
