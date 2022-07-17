import React from 'react'
import ReactDOM from 'react-dom'
import GeometryVisualizer from './visualizer-geometry/geometryVisualizer'
import Matricies from '../matrices/matrices'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import Loop from "@material-ui/icons/Loop";


import './visualizer.css'

export default class Visualizer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            matricies: this.arePropsFromLinkLocation() ? props.location.props.matricies : (props.matricies ? props.matricies : []),
            n: this.arePropsFromLinkLocation() ? props.location.props.n : (props.n ? props.n : 2),
            k: this.arePropsFromLinkLocation() ? props.location.props.k : (props.k ? props.k : 2)
        }
    }

    componentDidMount() {
        debugger
        var geo = document.getElementById("myGeometry");
        geo.style.width = "65%";
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

    arePropsFromLinkLocation() {
        return this.props.location.props != null;
    }


    render() {
        return (
            <div className="visualizer_component">
                <div id="myGeometry" className="geometry">
                </div>
                <div className="side_menu">
                    <Card className="card-box">
                        <CardContent>
                            <Link style={{float: "left"}} to={{
                                pathname: "/",
                            }}>
                                <Button variant="outlined" color="primary" >back</Button>
                            </Link>

                            <Matricies display={"block"} matricies={this.state.matricies} n={this.state.n} k={this.state.k} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }
}