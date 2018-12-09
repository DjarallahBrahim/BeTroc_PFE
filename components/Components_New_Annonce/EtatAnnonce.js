import React from 'react';
import { Dropdown } from 'react-native-material-dropdown';
export default class EtatAnnonce extends React.Component {

    render() {
        let data = [{
            value: 'Comme neuf',
        }, {
            value: 'État moynen',
        }, {
            value: 'Ancien',
        }];

        return (
            <Dropdown
                fontSize={15}
                label='État du produit'
                data={data}

            />
        );
    }
}