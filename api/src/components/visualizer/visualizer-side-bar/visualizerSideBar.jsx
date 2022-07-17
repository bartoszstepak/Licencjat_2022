import React from 'react'
import Matricies from '../../matrices/matrices'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import './visualizerSideBar.css'

export default class VisaulizerSideBar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            matricies: props.matricies ? props.matricies : [],
            n: props.n ? props.n : 2,
            k: props.k ? props.k : 2,
        }
    }

    render() {
        return (
            <div className="side_bar_component">
                <Card className="card-box">
                    <CardContent>
                        <Matricies matricies={this.state.matricies} n={this.state.n} k={this.state.k} />
                    </CardContent>
                </Card>
            </div>
        )
    }
}