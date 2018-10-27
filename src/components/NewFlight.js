import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import { addFlight, setGlobalToast } from '../actions/App';

class NewFlight extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            from: '',
            to: '',
            departureTime: '',
            landingTime: '',
            price: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit() {
        // TODO: proper validations

        let isValid = true;

        Object.keys(this.state).forEach((field) => {
           if (this.state[field] === '') {
               isValid = false;
           }
        });

        if (isValid) {
            this.props.addFlight(this.state);
            this.props.goToPage('/flights');
        } else {
            this.props.setGlobalToast({
                message: 'Please fill in all of the field',
                status: 'critical'
            });
        }
    }

    render() {
        return (
            <Box
                pad="large"
                align="center"
                justify="center"
            >
                <Heading>Add new flight</Heading>
                <Form onSubmit={this.handleSubmit}>
                    <FormField label="From">
                        <TextInput name="from" value={this.state.from} onDOMChange={this.handleChange} />
                    </FormField>
                    <FormField label="To">
                        <TextInput name="to" value={this.state.to} onDOMChange={this.handleChange} />
                    </FormField>
                    <FormField label="Departure Time">
                        <TextInput name="departureTime" value={this.state.departureTime} onDOMChange={this.handleChange} />
                    </FormField>
                    <FormField label="Landing Time">
                        <TextInput name="landingTime" value={this.state.landingTime} onDOMChange={this.handleChange} />
                    </FormField>
                    <FormField label="Price">
                        <TextInput name="price" value={this.state.price} onDOMChange={this.handleChange} />
                    </FormField>
                </Form>

                <Button style={{marginTop: '30px'}} onClick={this.handleSubmit} label="Add" primary />
            </Box>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    goToPage: (page) => dispatch(push(page)),
    addFlight: (payload) => dispatch(addFlight(payload)),
    setGlobalToast: (payload) => dispatch(setGlobalToast(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewFlight);
