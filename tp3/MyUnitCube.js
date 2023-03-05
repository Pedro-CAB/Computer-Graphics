import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
		
	}
	
	initBuffers() {
		this.vertices = [
            //Pontos para a face em z = -0.5
            
			-0.5, 0, -0.5,	//0
			0, -0.5, -0.5,	//1
			0, 0.5, -0.5,	//2
			0.5, 0, -0.5,	//3
            
            //Pontos que estão na face em z = 0.5
            -0.5, 0, 0.5,	//4
            0, 0.5, 0.5,    //5
			0, -0.5, 0.5,	//6
			0.5, 0, 0.5	    //7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            
            //Face 1
			0, 1, 2,
			1, 3, 2,
			0,2,1,
			1,2,3,
            //Face 2
            2,0,5,
            5,0,4,
			2,5,0,
			5,4,0,
            //Face 3
            2,5,3,
            5,7,3,
            //Face 4
            0,6,4,
            0,1,6,
			
            //Face 5
            7,6,1,
            7,1,3,
            //Face 6
            5,4,6,
            5,6,7,
			5,6,4,
			5,7,6

		];

		this.normals = [
			0,0,1,
			0,0,1, 
			0,0,1,
			0,0,1,
		]

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}