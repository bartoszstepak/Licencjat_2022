import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import GeometryVisualizer from '../visualizer/visualizer-geometry/geometryVisualizer'
import ReactDOM from 'react-dom'

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import Loop from "@material-ui/icons/Loop";


import './matricies.css'

/* eslint no-eval: 0 */
export default class Matrices extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            matricies: props.matricies ? props.matricies : [],
            n: props.n ? props.n : 2,
            k: props.k ? props.k : 2,
            canConpute: false,
            isComputing: true
        }
    }

    enableComputationIfmatriciesAreOk() {
        for (var i = 0; i < this.state.k; i++) {
            if (this.state.matricies[i].hasError || !this.state.matricies[i].isChecked) {
                return false
            }
        }
        this.setState({ canCompute: true })
        return true;
    }

    handleComputeBtn() {
        var geometryVisualizerNode = document.getElementById("geometryVisualizer")
        var guiNode = document.getElementById("gui");
        var geo = document.getElementById("myGeometry");
        

        if(geometryVisualizerNode) {
            geometryVisualizerNode.remove()
        }
       
        if (guiNode) {
            guiNode.remove()
            if(geo) {
                ReactDOM.render( <div className="loop">
                <div>
                
                <Loop className="rotating" />
                <div>
                    <h3>Computing geometry</h3>
                    <span>it can take a while and depends on the number of samples</span>
                    <p>If there aren`t matricies at the left CLICK BACK</p>
                </div> 
                </div>
                
            </div>, geo)
            }
        }
        
        let data = {
            matricies: this.state.matricies,
            k: this.state.k,
            n: this.state.n
        }
        axios.post(`http://localhost:8870/`, data)
            .then(res => {
                var geo = document.getElementById("myGeometry") 
                this.setState({isComputing: false})
                ReactDOM.render( <GeometryVisualizer id="qwe" points={res.data} isComputing={false}/>, geo)
               
            })
    }
    




    checkIfMatrixCorrect = (data) => {
        var factor = data.factor;
        var matrix = data.matrix;
        try {
            eval(factor);
        }
        catch (any) {
            if (!this.checkIfMathFunctinOk(factor)) {
                return false
            }
        }

        for (var i = 0; i < this.state.n * this.state.n; i++) {
            try {
                eval(matrix[i].value);
            }
            catch (any) {
                if (!this.checkIfMathFunctinOk(matrix[i].value)) {
                    return false
                }
            }
        }
        console.log("OK");
        return true;

    }

    checkIfMathFunctinOk(data) {
        if (data) {
            var expression = data.toString().split("");
            if ((expression[0] === "s" || expression[0] === "p" || expression[0] === "c" || expression[0] === "f")
                && (expression[1] === "(") 
                && (expression[expression.length-1] === ")")) {
                return true;
            }
        }
        return false;
    }

    render() {
        const listMatricies = this.state.matricies.map((matrix, index) => {
            return (
                <div  className="matrix">
                    <Typography variant="h4" color="textSecondary" gutterBottom>
                        F{index}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                        multiply matrix by factor
                    </Typography>

                    <TextField
                        className="matrix_element"
                        id="outlined-basic"
                        variant="outlined"
                        label="factor"
                        defaultValue={1}
                        value={this.state.matricies[index].factor}
                        onChange={(event) => {
                            var matricies = this.state.matricies;
                            matricies[index].factor = event.target.value;
                            matricies[index].isChecked = false;
                            matricies[index].hasError = false;
                            this.setState({
                                matricies: matricies,
                                canCompute: false,
                            })
                        }
                        } >
                    </TextField>

                    {matrix.matrix.map((element, index) => {

                        return (
                            <span>
                                {index % this.state.n === 0 ? (<br />) : (" ")}
                                <TextField
                                    className="matrix_element"
                                    variant="outlined"
                                    defaultValue={element.value}
                                    value={this.state.matricies[element.operatorNumber].matrix[index].value}
                                    onChange={(event) => {
                                        var matricies = this.state.matricies;
                                        matricies[element.operatorNumber].matrix[index].value = event.target.value;
                                        matricies[element.operatorNumber].isChecked = false;
                                        matricies[element.operatorNumber].hasError = false;
                                        this.setState({
                                            matricies: matricies,
                                            canCompute: false,
                                        })
                                    }
                                    } />
                            </span>
                        )
                    })}
                    <div className="confirm_btn">
                        <Button variant="outlined" color="primary" onClick={() => {
                            var isMatrixCorrect = this.checkIfMatrixCorrect(matrix);
                            var matricies = this.state.matricies;
                            matricies[index].hasError = !isMatrixCorrect;
                            matricies[index].isChecked = true;
                            this.setState({ matricies: matricies }, () => {
                                this.enableComputationIfmatriciesAreOk()
                            })
                        }}>
                            Submit
                            {matrix.isChecked && !matrix.hasError ?
                                (
                                    <CheckIcon style={{ color: "green" }} />
                                ) :
                                (
                                    <p className="icon">
                                        {matrix.hasError ?
                                            (
                                                <ClearIcon style={{ color: "red" }} />
                                            ) :
                                            (
                                                ""
                                            )
                                        }
                                    </p>
                                )
                            }
                        </Button>
                    </div>
                </div>
            )
        })
        return (
            <div>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                    Available expressions 
                    <p><p>p(x,y) - x to the power of y</p> <p> c(x,y) - complex number like x+yi </p><p> f(x,y) - fraction like x/y | s(x) - square root of x</p></p>
                </Typography>
                <div style={{display: this.props.display}} className="matrices">
                    {listMatricies}
                </div>
                <div id="computeBtn" className="center_button compute_btn">
                    {this.state.canCompute ?
                        (
                        <Button  color="primary" onClick={() => this.handleComputeBtn()}>
   
                                <Link to={{
                                pathname: "/visualizer",
                                props: {matricies: this.state.matricies, n: this.state.n, k: this.state.k, reload: this.props.reload ? this.reload : false},
                                aplied: true
                            }}>
                                <Button  variant="contained" color="secondary">
                                    compute
                                </Button>
                            </Link>
                            </Button>
                        ) :
                        (
                            <Button size="large" variant="outlined" disabled>
                                compute
                            </Button>
                        )
                    }
                </div>
            </div>

        )
    }
}