import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Search from 'grommet/components/Search';
import Button from 'grommet/components/Button';


class FlightsList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            filter: ''
        };

    }


    render() {
        const { flights = [] } = this.props;

        let flightsToShow = flights.filter((item) =>
             item.to.indexOf(this.state.filter) > -1
        );


        return (
            <Box
                align="center"
                justify="center"
                pad="large"
            >
                <Heading>
                    Flights List
                </Heading>
                <Search
                    placeHolder="Search destination"
                    inline={true}
                    value={this.state.filter}
                    onDOMChange={(e) => {
                        this.setState({
                            filter: e.target.value
                        });
                    }}
                />

                    <Table>
                        <thead>
                        <tr>
                            <th>From</th>
                            <th>To</th>
                            <th>Departure Time</th>
                            <th>Landing Time</th>
                            <th>Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {(flightsToShow.length > 0) && flightsToShow.map((item, key) =>
                            <TableRow key={key}>
                                <td>{item.from}</td>
                                <td>{item.to}</td>
                                <td>{item.departureTime}</td>
                                <td>{item.landingTime}</td>
                                <td>{item.price}</td>
                            </TableRow>
                        )}
                        {(!flightsToShow.length) && <TableRow><td colSpan="5">No flights listed</td></TableRow>}
                        </tbody>
                    </Table>
                    <Button
                        label="Add Flight"
                        onClick={() => {this.props.goToPage('/new_flight')}}
                        primary
                    />
                </Box>
        );
    }
}

const mapStateToProps = state => ({
    flights: state.app.get('flights').toJS()
});

const mapDispatchToProps = dispatch => ({
    goToPage: (page) => dispatch(push(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(FlightsList);
