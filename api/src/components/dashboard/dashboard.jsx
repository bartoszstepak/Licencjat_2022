import React from 'react';
import Matricies from '../matrices/matrices'

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import './dashboard.css';


export default class Dashboard extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            kTmp: 3,
            nTmp: 3,
            k: 2,
            n: 3,
            matricies: [],
            areMtricesParametersOk: false,
            canCompute: false
        }

        this.handleKChange = this.handleKChange.bind(this);
        this.handleNChange = this.handleNChange.bind(this);
    }

    handleKChange = (event) => {
        this.setState({ kTmp: event.target.value });
    }

    handleNChange = (event) => {
        this.setState({ nTmp: event.target.value });
    }

    handleMtricesParametersUpdate = (event) => {
        debugger
        var matricies = [];
        this.setState({areMtricesParametersOk :false}, () =>{
            for (var i = 0; i < this.state.kTmp; i++) {
                var matrix = [];
                for (var j = 0; j < this.state.nTmp * this.state.nTmp; j++) {
                    matrix.push({ value: 0, operatorNumber: i, index: j });
                }
                matricies.push({ matrix: matrix, factor: 1, isChecked: false, hasError: false })
            }
            this.setState({
                matricies: matricies,
                areMtricesParametersOk: true,
                canCompute: false,
                k: this.state.kTmp,
                n: this.state.nTmp
            })
        })
        
        
    }


    render() {

        return (
            <div className="dashboard_component">
                <Card className="card-box">
                    <CardContent>

                        <div className="selectors_area">
                            <div className="selector">
                                <Typography className="selector_title" color="textSecondary" gutterBottom>
                                    1 - Select number "k" of hermitian matrices
                        </Typography>
                                <FormControl variant="outlined" className="form_control">
                                    <Select
                                        value={this.state.kTmp}
                                        onChange={this.handleKChange}>
                                        <MenuItem value={3}>3</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="selector">
                                <Typography className="selector_title" color="textSecondary" gutterBottom>
                                    2 - Select dimention "n" of matrices                        </Typography>
                                <FormControl variant="outlined" className="form_control">
                                    <Select
                                        value={this.state.nTmp}
                                        onChange={this.handleNChange}>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className="center_button confirm_btn">
                            {this.state.k === 0 || this.state.n === 0 ?
                                (
                                    <Button variant="outlined" disabled>
                                        Confirm
                                    </Button>
                                ) :
                                (
                                    <Button variant="outlined" color="primary" onClick={this.handleMtricesParametersUpdate}>
                                        Confirm
                                    </Button>
                                )
                            }
                        </div>
                    </CardContent>
                </Card>

                {this.state.areMtricesParametersOk ?
                    (
                        <Card className="card-box margin-15">
                            <CardContent>
                                <Matricies  display={"flex"} matricies={this.state.matricies} n={this.state.n} k={this.state.k} />
                            </CardContent>
                        </Card>
                    ) :
                    (
                        ""
                    )}

            </div>
        )
    }
}