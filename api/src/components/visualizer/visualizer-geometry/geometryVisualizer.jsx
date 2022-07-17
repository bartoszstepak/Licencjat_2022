import React from 'react';
import axios from 'axios';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import qh from 'quickhull3d';
import { GUI } from 'dat-gui'
import Loop from "@material-ui/icons/Loop";

import './geometryVisualizer.css'

export default class GeometryVisualizer extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isComputing: true
        }
    }

    params = {
        stop: false,
    }

    componentDidMount() {
        this.setState({ isComputing: false })
        this.generate(this.props.points, false, true);
    }

    generate(points, isWireframe, isGridHelper) {

        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(45, window.innerWidth * 0.65 / window.innerHeight, 0.1, 10000);
        var renderer = new THREE.WebGLRenderer();
        var controls = new OrbitControls(camera, renderer.domElement);
        var app = document.getElementById("Visualizer");
        var geometry = new THREE.Geometry();

        renderer.setSize(window.innerWidth * 0.63, window.innerHeight-5);
        scene.background = new THREE.Color();
        app.appendChild(renderer.domElement);

        var guickHullsGeneratedFaces = qh(points);

        for (var i = 0; i < points.length; i += 1) {
            var ThreeVector3 = new THREE.Vector3().fromArray(points[i])
            geometry.vertices.push(ThreeVector3);
        }

        for (var i = 0; i < guickHullsGeneratedFaces.length; i += 1) {

            var vectorA = new THREE.Vector3().fromArray(points[guickHullsGeneratedFaces[i][0]]);
            var vectorB = new THREE.Vector3().fromArray(points[guickHullsGeneratedFaces[i][1]]);
            var vectorC = new THREE.Vector3().fromArray(points[guickHullsGeneratedFaces[i][2]]);

            var vector = new THREE.Vector3();
            var subVectorrsBAndA = new THREE.Vector3().subVectors(vectorB, vectorA);
            var subVectorrsCAndA = new THREE.Vector3().subVectors(vectorC, vectorA);
            vector.crossVectors(subVectorrsBAndA, subVectorrsCAndA);

            var normalizedVector = vector.normalize();
            var threeFace3 = new THREE.Face3(
                guickHullsGeneratedFaces[i][0],
                guickHullsGeneratedFaces[i][1],
                guickHullsGeneratedFaces[i][2],
                normalizedVector);

            geometry.faces.push(threeFace3);
        }

        var meshMaterialWireFrame = new THREE.MeshNormalMaterial({ wireframe: isWireframe });
        var mesh = new THREE.Mesh(geometry, meshMaterialWireFrame);

        // mesh.geometry.computeVertexNormals();
        scene.add(mesh);

        if (isGridHelper) {
            var gridHelper = new THREE.GridHelper(4000, 100, 0xACAEB0, 0xACAEB0);
            gridHelper.position.y = - 100;
            gridHelper.position.x = - 100;
            scene.add(gridHelper);
        }

        var gui = new GUI();
        gui.add(this.params, 'stop');
        gui.domElement.id = 'gui';

        var setAutoRotation = (stop = this.params.stop) => {
            if (!stop) {
                mesh.rotation.x += 0.005;
                mesh.rotation.y += 0.005;
                mesh.rotation.y += 0.005;
            }
        }

        camera.position.z = 3;
        camera.position.y = 1;
        camera.position.x = 0;

        controls.update();

        var animate = function () {
            requestAnimationFrame(animate);
            controls.update();
            setAutoRotation();
            renderer.render(scene, camera);
        }

        animate();
    }



    render() {
        return (
            <div className="geometry_visualizer_component">
                <div id="Visualizer"></div>
            </div>
        )
    }
}