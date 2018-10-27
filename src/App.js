import React from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import FlightsList from './components/FlightsList';
import NewFlight from './components/NewFlight';
import Login from './components/Login';
import App from 'grommet/components/App';
import Toast from 'grommet/components/Toast';
import { connect } from 'react-redux';
import { setGlobalToast, clearGlobalToast } from './actions/App';

class AppComponent extends React.Component {
    render() {
        const { globalToast, clearGlobalToast } = this.props;

        return (
            <App centered={false}>
                {(globalToast && globalToast.message && globalToast.status) &&
                    <Toast
                        status={globalToast.status}
                        onClose={clearGlobalToast}
                    >
                        {globalToast.message}
                    </Toast>
                }
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => <Redirect to="/login" />}
                    />
                    <Route
                        exact
                        path="/login"
                        component={Login}
                    />
                    <Route
                        exact
                        path="/flights"
                        component={FlightsList}
                    />
                    <Route
                        exact
                        path="/new_flight"
                        component={NewFlight}
                    />
                </Switch>
            </App>
        );
    }
}

const mapStateToProps = state => ({
    globalToast: state.app.get('globalToast').toJS(),
    flights: state.app.get('flights').toJS(),
});

const mapDispatchToProps = dispatch => ({
    setGlobalToast: (payload) => dispatch(setGlobalToast(payload)),
    clearGlobalToast: () => dispatch(clearGlobalToast())
});

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(AppComponent);

export default withRouter(connectedComponent);
