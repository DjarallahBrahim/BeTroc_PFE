import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

import UserInput from '../Commun/UserInput';

import usernameImg from '../../../../assets/images/username.png';
import passwordImg from '../../../../assets/images/password.png';

export default class Form extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={styles.globalContainer}>
                <UserInput
                    source={usernameImg}
                    placeholder="Username"
                    autoCapitalize={'none'}
                    returnKeyType={'done'}
                    autoCorrect={false}
                    handler={this.props.handlerUserName}
                />
                <UserInput
                    source={usernameImg} //TODO change to email Image
                    placeholder="Email"
                    autoCapitalize={'none'}
                    returnKeyType={'done'}
                    autoCorrect={false}
                    handler={this.props.handlerUserMail}
                />
                <UserInput
                    source={passwordImg}
                    placeholder="Password"
                    secureTextEntry={true}
                    returnKeyType={'done'}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    handler={this.props.handlerUserPassword}
                />
                <UserInput
                    source={passwordImg}
                    secureTextEntry={true}
                    placeholder="Confirm Password"
                    returnKeyType={'done'}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    handler={this.props.handlerPasswordConfirmation}
                >
                </UserInput>

            </View>
        );
    }
}


Form.propTypes = {
    handlerUserPassword: PropTypes.func.isRequired,
    handlerUserName: PropTypes.func.isRequired,
    handlerPasswordConfirmation: PropTypes.func.isRequired,
    handlerUserMail: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    globalContainer: {
        //flex: 1,
        height: 200,
        alignItems: 'center',
        //marginBottom:30
    },
});